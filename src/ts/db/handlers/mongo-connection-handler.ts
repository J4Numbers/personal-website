import {
  Connection,
  Model,
  Schema,
  createConnection,
  FilterQuery,
  Document, EnforceDocument
} from 'mongoose';
import BasicDataItem from '../../objects/BasicDataItem';
import bunyan_logger from '../../logger/bunyan_logger';

const logger = bunyan_logger();

export default class MongoConnectionHandler<T extends BasicDataItem> {
  connection: Connection;

  constructor (uri: string) {
    this.connection = createConnection(uri, {});
  }

  bootModel (modelName: string, model: Schema<T>): Model<T> {
    return this.connection.model(modelName, model);
  }

  async findById (model: Model<T>, id: string): Promise<EnforceDocument<T, any, any> | null> {
    try {
      return await model.findById(id);
    } catch (e) {
      logger.warn((e as Error).message);
      throw e;
    }
  }

  async findOrCreate (model: Model<T>, id: string): Promise<T> {
    try {
      return await model.findOneAndUpdate(
        // @ts-ignore
        { '_id': id },
        {},
        { upsert: true,
          new:    true },
      );
    } catch (err) {
      logger.warn((err as Error).message);
      throw err;
    }
  }

  async deleteById (model: Model<T>, id: string): Promise<void> {
    try {
      // @ts-ignore
      await model.deleteOne({ '_id': id });
    } catch (e) {
      logger.warn((e as Error).message);
      throw e;
    }
  }

  async findFromQuery (model: Model<T>, query: FilterQuery<T>, skip: number, limit: number, sort: any): Promise<Array<T>> {
    try {
      return await model.find(
        query,
        {},
        { skip,
          limit,
          sort },
      );
    } catch (e) {
      logger.warn((e as Error).message);
      throw e;
    }
  }

  async getTotalCountFromQuery (model: Model<T>, query: FilterQuery<T>): Promise<number> {
    try {
      return await model.countDocuments(query);
    } catch (e) {
      logger.warn((e as Error).message);
      throw e;
    }
  }

  async upsertItem (itemToSave: Document<T>): Promise<Document<T>> {
    try {
      return await itemToSave.save();
    } catch (e) {
      logger.warn((e as Error).message);
      throw e;
    }
  }
}
