import {QueryOptions, SortValues} from 'mongoose';
import {MangaDataItem} from '../../objects/MangaDataItem';

export default abstract class StandardMangaDataHandler {

  abstract findMangaByRawId (rawId: string): Promise<MangaDataItem>;

  abstract findMangaStories (skip: number, limit: number, sort: { [key: string]: SortValues }, category: string): Promise<Array<MangaDataItem>>;

  abstract findMangaStoriesByQuery (query: QueryOptions, skip: number, limit: number, sort: { [key: string]: SortValues }): Promise<Array<MangaDataItem>>;

  abstract getTotalStoryCount (category: string): Promise<number>;

  abstract upsertManga (newManga: MangaDataItem): Promise<MangaDataItem>;
}
