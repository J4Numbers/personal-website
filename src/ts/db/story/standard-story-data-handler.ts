import type { QueryOptions, SortValues } from 'mongoose';
import type { StoryDataItem } from '../../objects/StoryDataItem';

export default abstract class StandardStoryDataHandler {
  public abstract findStoryByRawId (rawId: string): Promise<StoryDataItem>;

  public abstract findAllStories (
    skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<StoryDataItem>>;

  public abstract findStoriesByQuery (
    query: QueryOptions, skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<StoryDataItem>>;

  public abstract getTotalStoryCount (): Promise<number>;

  public abstract upsertStory (storyToUpsert: StoryDataItem): Promise<StoryDataItem>;

  public abstract deleteStoryById (storyIdToRemove: string): Promise<StoryDataItem>;
}
