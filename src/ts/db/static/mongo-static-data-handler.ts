import StandardStaticDataHandler from './standard-static-data-handler';
import type MongoConnectionHandler from '../handlers/mongo-connection-handler';
import type { Document, Model } from 'mongoose';
import { Date, Schema } from 'mongoose';
import type { StaticDataItem } from '../../objects/StaticDataItem';
import type { StaticDocumentTypes } from '../../objects/StaticDocumentTypes';

export default class MongoStaticDataHandler extends StandardStaticDataHandler {
  private readonly dataHandler: MongoConnectionHandler<StaticDataItem>;

  private readonly dataSchema: Schema<StaticDataItem>;

  private readonly dataModel: Model<StaticDataItem>;

  public constructor (dataHandler: MongoConnectionHandler<StaticDataItem>) {
    super();
    this.dataHandler = dataHandler;
    this.dataSchema = new Schema({
      '_id':     String,
      'content': Object,
      'time_updated': {
        'type': Schema.Types.Date,
        'default': new Date(),
      },
    });
    this.dataModel = this.dataHandler.bootModel('StaticDocument', this.dataSchema);
  }

  public async findStaticByType (rawId: StaticDocumentTypes): Promise<StaticDataItem> {
    return this.dataHandler.findById(this.dataModel, rawId.toString());
  }

  public async upsertStatic (staticToUpsert: StaticDataItem): Promise<StaticDataItem> {
    let dataToUpsert: Document<StaticDataItem>;
    if (staticToUpsert._id !== undefined) {
      dataToUpsert = await this.dataHandler.findById(this.dataModel, staticToUpsert._id);
      if (typeof dataToUpsert === 'undefined') {
        throw new Error('Could not find given static to update');
      } else {
        dataToUpsert.set(staticToUpsert);
      }
    } else {
      throw new Error('Unable to find static to update');
    }
    dataToUpsert.set('time_updated', Date.now());
    return (await this.dataHandler.upsertItem(dataToUpsert)) as unknown as StaticDataItem;
  }
}
