import StandardStoryDataHandler from './standard-story-data-handler';
import type MongoConnectionHandler from '../handlers/mongo-connection-handler';
import type { Document, Model, QueryOptions, SortValues } from 'mongoose';
import { Date, Schema, Types } from 'mongoose';
import type { StoryDataItem } from '../../objects/StoryDataItem';

export default class MongoStoryDataHandler extends StandardStoryDataHandler {
  private readonly dataHandler: MongoConnectionHandler<StoryDataItem>;

  private readonly dataSchema: Schema<StoryDataItem>;

  private readonly dataModel: Model<StoryDataItem>;

  public constructor (dataHandler: MongoConnectionHandler<StoryDataItem>) {
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

  public async deleteStoryById (storyIdToRemove: string): Promise<StoryDataItem> {
    const storyToDelete = await this.findStoryByRawId(storyIdToRemove);
    await this.dataModel.deleteOne({ '_id': storyIdToRemove });
    return storyToDelete;
  }

  public async findAllStories (
    skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<StoryDataItem>> {
    return this.dataHandler
      .findFromQuery(this.dataModel, {}, skip, limit, sort);
  }

  public async findStoryByRawId (rawId: string): Promise<StoryDataItem> {
    return this.dataHandler.findById(this.dataModel, rawId);
  }

  public async findStoriesByQuery (
    query: QueryOptions, skip: number, limit: number,
    sort: Record<string, SortValues>,
  ): Promise<Array<StoryDataItem>> {
    return this.dataHandler.findFromQuery(this.dataModel, query, skip, limit, sort);
  }

  public async getTotalStoryCount (): Promise<number> {
    return this.dataHandler.getTotalCountFromQuery(this.dataModel, {});
  }

  public async upsertStory (storyToUpsert: StoryDataItem): Promise<StoryDataItem> {
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
