import type { QueryOptions, SortValues } from 'mongoose';
import type { MangaDataItem } from '../../objects/MangaDataItem';

export default abstract class StandardMangaDataHandler {
  public abstract findMangaByRawId (rawId: string): Promise<MangaDataItem>;

  public abstract findMangaStories (
    skip: number, limit: number, sort: Record<string, SortValues>, category: string,
  ): Promise<Array<MangaDataItem>>;

  public abstract findMangaStoriesByQuery (
    query: QueryOptions, skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<MangaDataItem>>;

  public abstract getTotalStoryCount (category: string): Promise<number>;

  public abstract upsertManga (newManga: MangaDataItem): Promise<MangaDataItem>;
}
