import type { SortValues } from 'mongoose';
import type { ChapterDataItem } from '../../objects/ChapterDataItem';

export default abstract class StandardChapterDataHandler {
  public abstract findChapterByRawId (rawId: string): Promise<ChapterDataItem>;

  public abstract findAllChaptersInStory (
    storyId: string, skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<ChapterDataItem>>;

  public abstract findChapterByStoryAndNumber (
    storyId: string, chapterNumber: number,
  ): Promise<ChapterDataItem>;

  public abstract getTotalChapterCountInStory (storyId: string): Promise<number>;

  public abstract upsertChapter (chapterToUpsert: ChapterDataItem): Promise<ChapterDataItem>;

  public abstract deleteChapterById (chapterIdToRemove: string): Promise<ChapterDataItem>;
}
