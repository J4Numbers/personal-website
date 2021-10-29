import {QueryOptions, SortValues} from 'mongoose';
import {StoryDataItem} from '../../objects/StoryDataItem';

export default abstract class StandardStoryDataHandler {
  abstract findStoryByRawId (rawId: string): Promise<StoryDataItem>;

  abstract findAllStories (skip: number, limit: number, sort: { [key: string]: SortValues }): Promise<Array<StoryDataItem>>;

  abstract findStoriesByQuery (query: QueryOptions, skip: number, limit: number, sort: { [key: string]: SortValues }): Promise<Array<StoryDataItem>>;

  abstract getTotalStoryCount (): Promise<number>;

  abstract upsertStory (storyToUpsert: StoryDataItem): Promise<StoryDataItem>;

  abstract deleteStoryById (storyIdToRemove: string): Promise<StoryDataItem>;
}
