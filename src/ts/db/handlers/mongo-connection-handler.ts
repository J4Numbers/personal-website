import type {
  Connection,
  Model,
  Schema,
  FilterQuery,
  Document, HydratedDocument,
} from 'mongoose';
import {
  createConnection,
} from 'mongoose';
import type BasicDataItem from '../../objects/BasicDataItem';
import bunyanLogger from '../../logger/bunyan-logger';

const logger = bunyanLogger();

export default class MongoConnectionHandler<T extends BasicDataItem> {
  private readonly connection: Connection;

  public constructor (uri: string) {
    this.connection = createConnection(uri, {});
  }

  public bootModel (modelName: string, model: Schema<T>): Model<T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.connection.model(modelName, model);
  }

  public async findById (
    model: Model<T>, id: string,
  ): Promise<HydratedDocument<T, any, any> | null> {
    try {
      return await model.findById(id);
    } catch (e: unknown) {
      logger.warn((e as Error).message);
      throw e;
    }
  }

  public async findOrCreate (model: Model<T>, id: string): Promise<T> {
    try {
      return await model.findOneAndUpdate(
        { '_id': id },
        {},
        { upsert: true,
          new:    true },
      );
    } catch (err: unknown) {
      logger.warn((err as Error).message);
      throw err;
    }
  }

  public async deleteById (model: Model<T>, id: string): Promise<void> {
    try {
      await model.deleteOne({ '_id': id });
    } catch (e: unknown) {
      logger.warn((e as Error).message);
      throw e;
    }
  }

  public async findFromQuery (
    model: Model<T>, query: FilterQuery<T>, skip: number, limit: number, sort: any,
  ): Promise<Array<T>> {
    try {
      return await model.find(
        query,
        {},
        { skip,
          limit,
          sort },
      );
    } catch (e: unknown) {
      logger.warn((e as Error).message);
      throw e;
    }
  }

  public async getTotalCountFromQuery (model: Model<T>, query: FilterQuery<T>): Promise<number> {
    try {
      return await model.countDocuments(query);
    } catch (e: unknown) {
      logger.warn((e as Error).message);
      throw e;
    }
  }

  public async upsertItem (itemToSave: Document<T>): Promise<Document<T>> {
    try {
      return await itemToSave.save();
    } catch (e: unknown) {
      logger.warn((e as Error).message);
      throw e;
    }
  }
}
