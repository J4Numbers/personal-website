import {QueryOptions, SortValues} from 'mongoose';
import {ArtDataItem} from '../../objects/ArtDataItem';

export default abstract class StandardArtDataHandler {
  abstract findArtByRawId (rawId: string): Promise<ArtDataItem>;

  abstract findAllArtPieces (skip: number, limit: number, sort: { [key: string]: SortValues }): Promise<Array<ArtDataItem>>;

  abstract findArtPiecesByQuery (query: QueryOptions, skip: number, limit: number, sort: { [key: string]: SortValues }): Promise<Array<ArtDataItem>>;

  abstract getTotalArtPieceCount (): Promise<number>;

  abstract upsertArt (pieceToUpsert: ArtDataItem): Promise<ArtDataItem>;

  abstract deleteArtById (artIdToRemove: string): Promise<ArtDataItem>;
}
