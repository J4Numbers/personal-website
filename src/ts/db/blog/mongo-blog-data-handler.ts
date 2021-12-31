import StandardBlogDataHandler from './standard-blog-data-handler';
import type MongoConnectionHandler from '../handlers/mongo-connection-handler';
import type { Document, Model, QueryOptions, SortValues } from 'mongoose';
import { Date, Schema, Types } from 'mongoose';
import type { BlogDataItem } from '../../objects/BlogDataItem';

export default class MongoBlogDataHandler extends StandardBlogDataHandler {
  private readonly dataHandler: MongoConnectionHandler<BlogDataItem>;

  private readonly dataSchema: Schema<BlogDataItem>;

  private readonly dataModel: Model<BlogDataItem>;

  public constructor (dataHandler: MongoConnectionHandler<BlogDataItem>) {
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

  private static buildQuery (visible = false): QueryOptions {
    const query: QueryOptions = {};
    if (visible) {
      query.public = true;
    }
    return query;
  }

  public async deleteBlogById (blogIdToRemove: string): Promise<BlogDataItem> {
    const blogToDelete = await this.findBlogByRawId(blogIdToRemove);
    await this.dataModel.deleteOne({ '_id': blogIdToRemove });
    return blogToDelete;
  }

  public async findAllBlogs (
    skip: number, limit: number, sort: Record<string, SortValues>, visible: boolean,
  ): Promise<Array<BlogDataItem>> {
    return this.dataHandler
      .findFromQuery(this.dataModel, MongoBlogDataHandler.buildQuery(visible), skip, limit, sort);
  }

  public async findBlogByRawId (rawId: string): Promise<BlogDataItem> {
    return this.dataHandler.findById(this.dataModel, rawId);
  }

  public async findBlogsByQuery (
    query: QueryOptions, skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<BlogDataItem>> {
    return this.dataHandler.findFromQuery(this.dataModel, query, skip, limit, sort);
  }

  public async getTotalBlogCount (visible: boolean): Promise<number> {
    return this.dataHandler
      .getTotalCountFromQuery(this.dataModel, MongoBlogDataHandler.buildQuery(visible));
  }

  public async upsertBlog (blogToUpsert: BlogDataItem): Promise<BlogDataItem> {
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
