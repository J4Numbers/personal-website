import type { QueryOptions, SortValues } from 'mongoose';
import type { ArtDataItem } from '../../objects/ArtDataItem';

export default abstract class StandardArtDataHandler {
  public abstract findArtByRawId (rawId: string): Promise<ArtDataItem>;

  public abstract findAllArtPieces (
    skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<ArtDataItem>>;

  public abstract findArtPiecesByQuery (
    query: QueryOptions, skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<ArtDataItem>>;

  public abstract getTotalArtPieceCount (): Promise<number>;

  public abstract upsertArt (pieceToUpsert: ArtDataItem): Promise<ArtDataItem>;

  public abstract deleteArtById (artIdToRemove: string): Promise<ArtDataItem>;
}
