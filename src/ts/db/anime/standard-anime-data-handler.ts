import {AnimeDataItem} from '../../objects/AnimeDataItem';
import {Document, QueryOptions, SortValues} from 'mongoose';

export default abstract class StandardAnimeDataHandler {

  abstract findAnimeByAniListId (aniListId: number): Promise<Array<AnimeDataItem>>;

  abstract findAnimeByRawId (rawId: string): Promise<Document<AnimeDataItem>>;

  abstract findAnimeShows (skip: number, limit: number, sort: { [key: string]: SortValues }, category: string): Promise<Array<AnimeDataItem>>;

  abstract findAnimeShowsByQuery (query: QueryOptions, skip: number, limit: number, sort: { [key: string]: SortValues }): Promise<Array<AnimeDataItem>>;

  abstract getTotalShowCount (category: string): Promise<number>;

  abstract editAnime (animeId: string, reviewText: string, tagList: Array<string>): Promise<Document<AnimeDataItem>>;

  abstract updateExistingAnime (updatedAnime: AnimeDataItem): Promise<Document<AnimeDataItem>>;

  abstract addNewAnime (newAnime: AnimeDataItem): Promise<Document<AnimeDataItem>>;
}
