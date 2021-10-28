import StandardBlogDataHandler from './standard-blog-data-handler';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import {Date, Document, Model, QueryOptions, Schema, SortValues, Types} from 'mongoose';
import {BlogDataItem} from '../../objects/BlogDataItem';

export default class MongoBlogDataHandler extends StandardBlogDataHandler {
  dataHandler: MongoConnectionHandler<BlogDataItem>;
  dataSchema: Schema<BlogDataItem>;
  dataModel: Model<BlogDataItem>;

  constructor(dataHandler: MongoConnectionHandler<BlogDataItem>) {
    super();
    this.dataHandler = dataHandler;
    this.dataSchema = new Schema({
      '_id':   Schema.Types.ObjectId,
      'short_title':  String,
      'long_title':   String,
      'public':       Boolean,
      'full_text':    String,
      'time_posted':  {
        type:    Schema.Types.Date,
        default:  new Date(),
      },
      'time_updated': {
        type:    Schema.Types.Date,
        default: new Date(),
      },
      'tags':         Array,
      'comments':     Array,
    });
    this.dataModel = this.dataHandler.bootModel('BlogPost', this.dataSchema);
  }

  async deleteBlogById(blogIdToRemove: string): Promise<BlogDataItem> {
    const blogToDelete = await this.findBlogByRawId(blogIdToRemove);
    await this.dataModel.deleteOne({'_id': blogIdToRemove});
    return blogToDelete;
  }

  static buildQuery (visible = false): QueryOptions {
    const query: QueryOptions = {};
    if (visible) {
      query.public = true;
    }
    return query;
  }

  findAllBlogs(skip: number, limit: number, sort: { [p: string]: SortValues }, visible: boolean): Promise<Array<BlogDataItem>> {
    return this.dataHandler
      .findFromQuery(this.dataModel, MongoBlogDataHandler.buildQuery(visible), skip, limit, sort);
  }

  findBlogByRawId(rawId: string): Promise<BlogDataItem> {
    return this.dataHandler.findById(this.dataModel, rawId);
  }

  findBlogsByQuery(query: QueryOptions, skip: number, limit: number, sort: { [p: string]: SortValues }): Promise<Array<BlogDataItem>> {
    return this.dataHandler.findFromQuery(this.dataModel, query, skip, limit, sort);
  }

  getTotalBlogCount(visible: boolean): Promise<number> {
    return this.dataHandler.getTotalCountFromQuery(this.dataModel, MongoBlogDataHandler.buildQuery(visible));
  }

  async upsertBlog(blogToUpsert: BlogDataItem): Promise<BlogDataItem> {
    let dataToUpsert: Document<BlogDataItem>;
    if (blogToUpsert._id !== undefined) {
      dataToUpsert = await this.dataHandler.findById(this.dataModel, blogToUpsert._id);
      if (typeof dataToUpsert === 'undefined') {
        throw new Error('Could not find given blog to update');
      } else {
        dataToUpsert.set(blogToUpsert);
      }
    } else {
      dataToUpsert = new this.dataModel(blogToUpsert);
      dataToUpsert.set('_id', new Types.ObjectId());
    }
    dataToUpsert.set('time_updated', Date.now());
    return (await this.dataHandler.upsertItem(dataToUpsert)) as unknown as BlogDataItem;
  }

}
