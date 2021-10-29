import StandardChapterDataHandler from './standard-chapter-data-handler';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import {Date, Document, Model, QueryOptions, Schema, SortValues, Types} from 'mongoose';
import {ChapterDataItem} from '../../objects/ChapterDataItem';

export default class MongoChapterDataHandler extends StandardChapterDataHandler {
  dataHandler: MongoConnectionHandler<ChapterDataItem>;
  dataSchema: Schema<ChapterDataItem>;
  dataModel: Model<ChapterDataItem>;

  constructor(dataHandler: MongoConnectionHandler<ChapterDataItem>) {
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

  async deleteChapterById(chapterIdToRemove: string): Promise<ChapterDataItem> {
    const chapterToDelete = await this.findChapterByRawId(chapterIdToRemove);
    await this.dataModel.deleteOne({'_id': chapterIdToRemove});
    return chapterToDelete;
  }

  findAllChaptersInStory(storyId: string, skip: number, limit: number, sort: { [p: string]: SortValues }): Promise<Array<ChapterDataItem>> {
    return this.dataHandler
      .findFromQuery(this.dataModel, MongoChapterDataHandler.buildQuery({ story_id: storyId }), skip, limit, sort);
  }

  findChapterByRawId(rawId: string): Promise<ChapterDataItem> {
    return this.dataHandler.findById(this.dataModel, rawId);
  }

  async findChapterByStoryAndNumber(storyId: string, chapterNumber: number): Promise<ChapterDataItem> {
    const chapter: Array<ChapterDataItem> = await this.dataHandler
      .findFromQuery(
        this.dataModel,
        MongoChapterDataHandler.buildQuery({ story_id: storyId, chapter_number: chapterNumber }),
        0, 1, {},
      );
    if (chapter.length > 0) {
      return chapter[0];
    } else {
      throw new Error(`Unable to find chapter ${chapterNumber} within story of id '${storyId}'`);
    }
  }

  getTotalChapterCountInStory(storyId: string): Promise<number> {
    return this.dataHandler.getTotalCountFromQuery(
      this.dataModel, MongoChapterDataHandler.buildQuery({ story_id: storyId }),
    );
  }

  async upsertChapter(chapterToUpsert: ChapterDataItem): Promise<ChapterDataItem> {
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
