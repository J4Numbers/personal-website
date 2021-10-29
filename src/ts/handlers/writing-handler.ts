import StandardStoryDataHandler from '../db/story/standard-story-data-handler';
import StandardChapterDataHandler from '../db/chapter/standard-chapter-data-handler';
import {StoryDataItem} from '../objects/StoryDataItem';
import {ChapterDataItem} from '../objects/ChapterDataItem';

export default class WritingHandler {
  private storyDataHandler: StandardStoryDataHandler;
  private chapterDataHandler: StandardChapterDataHandler;

  constructor(storyDataHandler: StandardStoryDataHandler, chapterDataHandler: StandardChapterDataHandler) {
    this.storyDataHandler = storyDataHandler;
    this.chapterDataHandler = chapterDataHandler;
  }

  getStoryById(id: string) {
    return this.storyDataHandler.findStoryByRawId(id);
  }

  async lookupStories(title: string, tags: Array<string>): Promise<Array<StoryDataItem>> {
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

  async listStories(currentPage: number, maxPerPage: number) {
    return this.storyDataHandler.findAllStories(
      Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'title': 1 },
    );
  }

  getTotalStoryCount() {
    return this.storyDataHandler.getTotalStoryCount();
  }

  submitStory(storyToSubmit: StoryDataItem) {
    return this.storyDataHandler.upsertStory(storyToSubmit);
  }

  deleteStory(storyIdToDelete: string) {
    return this.storyDataHandler.deleteStoryById(storyIdToDelete);
  }

  listChaptersInStory(storyId: string, currentPage: number, maxPerPage: number) {
    return this.chapterDataHandler.findAllChaptersInStory(
      storyId, Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'chapter_number': 1 },
    )
  }

  getChapterByStoryIdAndChapterNumber(storyId: string, chapterNumber: number) {
    return this.chapterDataHandler.findChapterByStoryAndNumber(storyId, chapterNumber);
  }

  getChapterById(id: string) {
    return this.chapterDataHandler.findChapterByRawId(id);
  }

  async submitChapter(chapterToSubmit: ChapterDataItem) {
    let newChapter = chapterToSubmit._id === undefined;
    const uploadedChapter = await this.chapterDataHandler.upsertChapter(chapterToSubmit);
    if (newChapter) {
      const storyToUpdate = await this.getStoryById(chapterToSubmit.parent_story_id);
      storyToUpdate.chapters.push(uploadedChapter._id as string);
      await this.storyDataHandler.upsertStory(storyToUpdate);
    }
    return uploadedChapter;
  }

  async deleteChapter(chapterIdToDelete: string) {
    const chapterToDelete = await this.getChapterById(chapterIdToDelete);
    const parentStory = await this.getStoryById(chapterToDelete.parent_story_id);
    parentStory.chapters = parentStory.chapters.filter((chapterId) => chapterId !== chapterIdToDelete);
    const upStoryProm = this.storyDataHandler.upsertStory(parentStory);
    const delChapterProm = this.chapterDataHandler.deleteChapterById(chapterIdToDelete);
    await Promise.all([ upStoryProm, delChapterProm ]);
    return chapterToDelete;
  }
}
