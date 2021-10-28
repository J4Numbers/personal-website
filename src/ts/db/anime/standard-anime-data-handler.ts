import {AnimeDataItem} from '../../objects/AnimeDataItem';
import {QueryOptions, SortValues} from 'mongoose';

export default abstract class StandardAnimeDataHandler {

  abstract findAnimeByRawId (rawId: string): Promise<AnimeDataItem>;

  abstract findAnimeShows (skip: number, limit: number, sort: { [key: string]: SortValues }, category: string): Promise<Array<AnimeDataItem>>;

  abstract findAnimeShowsByQuery (query: QueryOptions, skip: number, limit: number, sort: { [key: string]: SortValues }): Promise<Array<AnimeDataItem>>;

  abstract getTotalShowCount (category: string): Promise<number>;

  abstract upsertAnime (newAnime: AnimeDataItem): Promise<AnimeDataItem>;
}
