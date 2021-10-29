import StandardStoryDataHandler from './standard-story-data-handler';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import {Date, Document, Model, QueryOptions, Schema, SortValues, Types} from 'mongoose';
import {StoryDataItem} from '../../objects/StoryDataItem';

export default class MongoStoryDataHandler extends StandardStoryDataHandler {
  dataHandler: MongoConnectionHandler<StoryDataItem>;
  dataSchema: Schema<StoryDataItem>;
  dataModel: Model<StoryDataItem>;

  constructor(dataHandler: MongoConnectionHandler<StoryDataItem>) {
    super();
    this.dataHandler = dataHandler;
    this.dataSchema = new Schema({
      '_id':          Schema.Types.ObjectId,
      'story_status': String,
      'story_type':   String,
      'title':        String,
      'synopsis':     String,
      'cover_img':    String,
      'chapters':     Array,
      'time_posted':  {
        type:    Schema.Types.Date,
        default: new Date(),
      },
      'time_updated': {
        type:    Schema.Types.Date,
        default: new Date(),
      },
      'tags':         Array,
      'meta_review':  String,
    });
    this.dataModel = this.dataHandler.bootModel('Story', this.dataSchema);
  }

  static buildQuery ({ story_id, chapter_number }: { story_id?: string, chapter_number?: number }): QueryOptions {
    const queryOpts: QueryOptions = {};
    if (story_id !== undefined) {
      queryOpts[ 'parent_story_id' ] = { '$eq': story_id };
    }
    if (chapter_number !== undefined) {
      queryOpts[ 'chapter_number' ] = { '$eq': chapter_number };
    }
    return queryOpts;
  }

  async deleteStoryById(storyIdToRemove: string): Promise<StoryDataItem> {
    const storyToDelete = await this.findStoryByRawId(storyIdToRemove);
    await this.dataModel.deleteOne({'_id': storyIdToRemove});
    return storyToDelete;
  }

  findAllStories(skip: number, limit: number, sort: { [p: string]: SortValues }): Promise<Array<StoryDataItem>> {
    return this.dataHandler
      .findFromQuery(this.dataModel, {}, skip, limit, sort);
  }

  findStoryByRawId(rawId: string): Promise<StoryDataItem> {
    return this.dataHandler.findById(this.dataModel, rawId);
  }

  findStoriesByQuery (query: QueryOptions, skip: number, limit: number, sort: { [key: string]: SortValues }): Promise<Array<StoryDataItem>> {
    return this.dataHandler.findFromQuery(this.dataModel, query, skip, limit, sort);
  }

  getTotalStoryCount (): Promise<number> {
    return this.dataHandler.getTotalCountFromQuery(this.dataModel, {});
  }

  async upsertStory(storyToUpsert: StoryDataItem): Promise<StoryDataItem> {
    let dataToUpsert: Document<StoryDataItem>;
    if (storyToUpsert._id !== undefined) {
      dataToUpsert = await this.dataHandler.findById(this.dataModel, storyToUpsert._id);
      if (typeof dataToUpsert === 'undefined') {
        throw new Error('Could not find given story to update');
      } else {
        dataToUpsert.set(storyToUpsert);
      }
    } else {
      dataToUpsert = new this.dataModel(storyToUpsert);
      dataToUpsert.set('_id', new Types.ObjectId());
    }
    dataToUpsert.set('time_updated', Date.now());
    return (await this.dataHandler.upsertItem(dataToUpsert)) as unknown as StoryDataItem;
  }

}
