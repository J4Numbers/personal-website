import type { AnimeDataItem } from '../../objects/AnimeDataItem';
import type { QueryOptions, SortValues } from 'mongoose';

export default abstract class StandardAnimeDataHandler {
  public abstract findAnimeByRawId (rawId: string): Promise<AnimeDataItem>;

  public abstract findAnimeShows (
    skip: number, limit: number, sort: Record<string, SortValues>, category: string,
  ): Promise<Array<AnimeDataItem>>;

  public abstract findAnimeShowsByQuery (
    query: QueryOptions, skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<AnimeDataItem>>;

  public abstract getTotalShowCount (category: string): Promise<number>;

  public abstract upsertAnime (newAnime: AnimeDataItem): Promise<AnimeDataItem>;
}
