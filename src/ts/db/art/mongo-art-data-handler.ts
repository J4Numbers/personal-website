import StandardArtDataHandler from './standard-art-data-handler';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import {Date, Document, Model, QueryOptions, Schema, SortValues, Types} from 'mongoose';
import {ArtDataItem} from '../../objects/ArtDataItem';

export default class MongoArtDataHandler extends StandardArtDataHandler {
  dataHandler: MongoConnectionHandler<ArtDataItem>;
  dataSchema: Schema<ArtDataItem>;
  dataModel: Model<ArtDataItem>;

  constructor(dataHandler: MongoConnectionHandler<ArtDataItem>) {
    super();
    this.dataHandler = dataHandler;
    this.dataSchema = new Schema({
      '_id':   Schema.Types.ObjectId,
      'title': String,
      'image': new Schema({
        'full_size': String,
        'thumb':     String,
      }),
      'date_completed': { type: Date },
      'tags':           Array,
      'time_updated':   {
        type:    Schema.Types.Date,
        default: new Date(),
      },
      'notes':          String,
    });
    this.dataModel = this.dataHandler.bootModel('ArtPiece', this.dataSchema);
  }

  async deleteArtById(artIdToRemove: string): Promise<ArtDataItem> {
    const artToDelete = await this.findArtByRawId(artIdToRemove);
    await this.dataModel.deleteOne({'_id': artIdToRemove});
    return artToDelete;
  }

  findAllArtPieces(skip: number, limit: number, sort: { [p: string]: SortValues }): Promise<Array<ArtDataItem>> {
    return this.dataHandler
      .findFromQuery(this.dataModel, {}, skip, limit, sort);
  }

  findArtByRawId(rawId: string): Promise<ArtDataItem> {
    return this.dataHandler.findById(this.dataModel, rawId);
  }

  findArtPiecesByQuery(query: QueryOptions, skip: number, limit: number, sort: { [p: string]: SortValues }): Promise<Array<ArtDataItem>> {
    return this.dataHandler.findFromQuery(this.dataModel, query, skip, limit, sort);
  }

  getTotalArtPieceCount(): Promise<number> {
    return this.dataHandler.getTotalCountFromQuery(this.dataModel, {});
  }

  async upsertArt(pieceToUpsert: ArtDataItem): Promise<ArtDataItem> {
    let dataToUpsert: Document<ArtDataItem>;
    if (pieceToUpsert._id !== undefined) {
      dataToUpsert = await this.dataHandler.findById(this.dataModel, pieceToUpsert._id);
      if (typeof dataToUpsert === 'undefined') {
        throw new Error('Could not find given art piece to update');
      } else {
        dataToUpsert.set(pieceToUpsert);
      }
    } else {
      dataToUpsert = new this.dataModel(pieceToUpsert);
      dataToUpsert.set('_id', new Types.ObjectId());
    }
    dataToUpsert.set('time_updated', Date.now());
    return (await this.dataHandler.upsertItem(dataToUpsert)) as unknown as ArtDataItem;
  }

}
