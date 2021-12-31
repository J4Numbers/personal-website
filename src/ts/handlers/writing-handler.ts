import type StandardStoryDataHandler from '../db/story/standard-story-data-handler';
import type StandardChapterDataHandler from '../db/chapter/standard-chapter-data-handler';
import type { StoryDataItem } from '../objects/StoryDataItem';
import type { ChapterDataItem } from '../objects/ChapterDataItem';

export default class WritingHandler {
  private readonly storyDataHandler: StandardStoryDataHandler;

  private readonly chapterDataHandler: StandardChapterDataHandler;

  public constructor (
    storyDataHandler: StandardStoryDataHandler, chapterDataHandler: StandardChapterDataHandler,
  ) {
    this.storyDataHandler = storyDataHandler;
    this.chapterDataHandler = chapterDataHandler;
  }

  public async getStoryById (id: string): Promise<StoryDataItem> {
    return this.storyDataHandler.findStoryByRawId(id);
  }

  public async lookupStories (title: string, tags: Array<string>): Promise<Array<StoryDataItem>> {
    return this.storyDataHandler.findStoriesByQuery({
      $or: [
        {
          tags: {
            $all: tags,
          },
        },
        {
          'title': {
            $regex:   title,
            $options: 'i',
          },
        },
      ],
    }, 0, 10, { 'title': -1 });
  }

  public async listStories (
    currentPage: number, maxPerPage: number,
  ): Promise<Array<StoryDataItem>> {
    return this.storyDataHandler.findAllStories(
      Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'title': 1 },
    );
  }

  public async getTotalStoryCount (): Promise<number> {
    return this.storyDataHandler.getTotalStoryCount();
  }

  public async submitStory (storyToSubmit: StoryDataItem): Promise<StoryDataItem> {
    return this.storyDataHandler.upsertStory(storyToSubmit);
  }

  public async deleteStory (storyIdToDelete: string): Promise<StoryDataItem> {
    return this.storyDataHandler.deleteStoryById(storyIdToDelete);
  }

  public async listChaptersInStory (
    storyId: string, currentPage: number, maxPerPage: number,
  ): Promise<Array<ChapterDataItem>> {
    return this.chapterDataHandler.findAllChaptersInStory(
      storyId, Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'chapter_number': 1 },
    );
  }

  public async getChapterByStoryIdAndChapterNumber (
    storyId: string, chapterNumber: number,
  ): Promise<ChapterDataItem> {
    return this.chapterDataHandler.findChapterByStoryAndNumber(storyId, chapterNumber);
  }

  public async getChapterById (id: string): Promise<ChapterDataItem> {
    return this.chapterDataHandler.findChapterByRawId(id);
  }

  public async submitChapter (chapterToSubmit: ChapterDataItem): Promise<ChapterDataItem> {
    const newChapter = chapterToSubmit._id === undefined;
    const uploadedChapter = await this.chapterDataHandler.upsertChapter(chapterToSubmit);
    if (newChapter) {
      const storyToUpdate = await this.getStoryById(chapterToSubmit.parent_story_id);
      storyToUpdate.chapters.push(uploadedChapter._id as string);
      await this.storyDataHandler.upsertStory(storyToUpdate);
    }
    return uploadedChapter;
  }

  public async deleteChapter (chapterIdToDelete: string): Promise<ChapterDataItem> {
    const chapterToDelete = await this.getChapterById(chapterIdToDelete);
    const parentStory = await this.getStoryById(chapterToDelete.parent_story_id);
    parentStory.chapters = parentStory.chapters
      .filter((chapterId) => chapterId !== chapterIdToDelete);
    const upStoryProm = this.storyDataHandler.upsertStory(parentStory);
    const delChapterProm = this.chapterDataHandler.deleteChapterById(chapterIdToDelete);
    await Promise.all([ upStoryProm, delChapterProm ]);
    return chapterToDelete;
  }
}
