import StandardChapterDataHandler from './standard-chapter-data-handler';
import type MongoConnectionHandler from '../handlers/mongo-connection-handler';
import type { Document, Model, QueryOptions, SortValues } from 'mongoose';
import { Date, Schema, Types } from 'mongoose';
import type { ChapterDataItem } from '../../objects/ChapterDataItem';

export default class MongoChapterDataHandler extends StandardChapterDataHandler {
  private readonly dataHandler: MongoConnectionHandler<ChapterDataItem>;

  private readonly dataSchema: Schema<ChapterDataItem>;

  private readonly dataModel: Model<ChapterDataItem>;

  public constructor (dataHandler: MongoConnectionHandler<ChapterDataItem>) {
    super();
    this.dataHandler = dataHandler;
    this.dataSchema = new Schema({
      '_id':             Schema.Types.ObjectId,
      'parent_story_id': String,
      'chapter_number':  Number,
      'chapter_title':   String,
      'chapter_text':    String,
      'time_posted':     {
        type:    Schema.Types.Date,
        default: new Date(),
      },
      'time_updated':    {
        type:    Schema.Types.Date,
        default: new Date(),
      },
      'author_notes':    String,
    });
    this.dataModel = this.dataHandler.bootModel('Chapter', this.dataSchema);
  }

  private static buildQuery (
    { storyId, chapterNumber }: { storyId?: string; chapterNumber?: number },
  ): QueryOptions {
    const queryOpts: QueryOptions = {};
    if (storyId !== undefined) {
      queryOpts.parent_story_id = { '$eq': storyId };
    }
    if (chapterNumber !== undefined) {
      queryOpts.chapter_number = { '$eq': chapterNumber };
    }
    return queryOpts;
  }

  public async deleteChapterById (chapterIdToRemove: string): Promise<ChapterDataItem> {
    const chapterToDelete = await this.findChapterByRawId(chapterIdToRemove);
    await this.dataModel.deleteOne({ '_id': chapterIdToRemove });
    return chapterToDelete;
  }

  public async findAllChaptersInStory (
    storyId: string, skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<ChapterDataItem>> {
    return this.dataHandler
      .findFromQuery(
        this.dataModel,
        MongoChapterDataHandler.buildQuery({ storyId }),
        skip, limit, sort,
      );
  }

  public async findChapterByRawId (rawId: string): Promise<ChapterDataItem> {
    return this.dataHandler.findById(this.dataModel, rawId);
  }

  public async findChapterByStoryAndNumber (
    storyId: string, chapterNumber: number,
  ): Promise<ChapterDataItem> {
    const chapter: Array<ChapterDataItem> = await this.dataHandler
      .findFromQuery(
        this.dataModel,
        MongoChapterDataHandler.buildQuery({
          storyId,
          chapterNumber,
        }),
        0, 1, {},
      );
    if (chapter.length > 0) {
      return chapter[ 0 ];
    }
    throw new Error(`Unable to find chapter ${chapterNumber} within story of id '${storyId}'`);
  }

  public async getTotalChapterCountInStory (storyId: string): Promise<number> {
    return this.dataHandler.getTotalCountFromQuery(
      this.dataModel, MongoChapterDataHandler.buildQuery({ storyId }),
    );
  }

  public async upsertChapter (chapterToUpsert: ChapterDataItem): Promise<ChapterDataItem> {
    let dataToUpsert: Document<ChapterDataItem>;
    if (chapterToUpsert._id !== undefined) {
      dataToUpsert = await this.dataHandler.findById(this.dataModel, chapterToUpsert._id);
      if (typeof dataToUpsert === 'undefined') {
        throw new Error('Could not find given chapter to update');
      } else {
        dataToUpsert.set(chapterToUpsert);
      }
    } else {
      dataToUpsert = new this.dataModel(chapterToUpsert);
      dataToUpsert.set('_id', new Types.ObjectId());
    }
    dataToUpsert.set('time_updated', Date.now());
    return (await this.dataHandler.upsertItem(dataToUpsert)) as unknown as ChapterDataItem;
  }
}
