import {SortValues} from 'mongoose';
import {ChapterDataItem} from '../../objects/ChapterDataItem';

export default abstract class StandardChapterDataHandler {
  abstract findChapterByRawId (rawId: string): Promise<ChapterDataItem>;

  abstract findAllChaptersInStory (storyId: string, skip: number, limit: number, sort: { [key: string]: SortValues }): Promise<Array<ChapterDataItem>>;

  abstract findChapterByStoryAndNumber (storyId: string, chapterNumber: number): Promise<ChapterDataItem>;

  abstract getTotalChapterCountInStory(storyId: string): Promise<number>;

  abstract upsertChapter (chapterToUpsert: ChapterDataItem): Promise<ChapterDataItem>;

  abstract deleteChapterById (chapterIdToRemove: string): Promise<ChapterDataItem>;
}
