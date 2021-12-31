import StandardMangaDataHandler from './standard-manga-data-handler';
import type MongoConnectionHandler from '../handlers/mongo-connection-handler';
import type { Model, SortValues, QueryOptions, Document } from 'mongoose';
import { Schema, Date, Types } from 'mongoose';
import type { MangaDataItem } from '../../objects/MangaDataItem';
import { MangaStatus } from '../../objects/MangaDataItem';

export default class MongoMangaDataHandler extends StandardMangaDataHandler {
  private readonly dataHandler: MongoConnectionHandler<MangaDataItem>;

  private readonly dataSchema: Schema<MangaDataItem>;

  private readonly dataModel: Model<MangaDataItem>;

  public constructor (dataHandler: MongoConnectionHandler<MangaDataItem>) {
    super();
    this.dataHandler = dataHandler;
    this.dataSchema = new Schema({
      '_id':      Schema.Types.ObjectId,
      'manga_id': {
        'ani_list':      Number,
        'my_anime_list': Number,
        'ani_db':        Number,
      },
      'manga_status': String,
      'story_type':   String,
      'title':        {
        'romaji':  String,
        'english': String,
        'native':  String,
      },
      'score':        Number,
      'status':       String,
      'total_vols':   Number,
      'total_chaps':  Number,
      'current_vol':  Number,
      'current_chap': Number,
      'synopsis':     String,
      'cover_img':    {
        'medium': String,
        'large':  String,
      },
      'tags':         Array,
      'time_updated': {
        type:    Schema.Types.Date,
        default: new Date(),
      },
      'review':       String,
      'last_hash':    String,
    });
    this.dataModel = this.dataHandler.bootModel('MangaBook', this.dataSchema);
  }

  private static buildQuery (status = ''): QueryOptions {
    const query: QueryOptions = {};
    if (status !== 'all') {
      if (status === 'read') {
        query.current_chap = { $gte: 1 };
      }
      if (status === 'completed') {
        query.status = MangaStatus.COMPLETED;
      }
      if (status === 'reading') {
        query.status = MangaStatus.CURRENT;
      }
      if (status === 'held') {
        query.status = MangaStatus.PAUSED;
      }
      if (status === 'dropped') {
        query.status = MangaStatus.DROPPED;
      }
      if (status === 'planned') {
        query.status = MangaStatus.PLANNING;
      }
    }
    return query;
  }

  public async findMangaByRawId (rawId: string): Promise<MangaDataItem> {
    return this.dataHandler.findById(this.dataModel, rawId);
  }

  public async findMangaStories (
    skip: number, limit: number, sort: Record<string, SortValues>, category: string,
  ): Promise<Array<MangaDataItem>> {
    return this.dataHandler
      .findFromQuery(this.dataModel, MongoMangaDataHandler.buildQuery(category), skip, limit, sort);
  }

  public async findMangaStoriesByQuery (
    query: QueryOptions, skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<MangaDataItem>> {
    return this.dataHandler.findFromQuery(this.dataModel, query, skip, limit, sort);
  }

  public async getTotalStoryCount (category: string): Promise<number> {
    return this.dataHandler
      .getTotalCountFromQuery(this.dataModel, MongoMangaDataHandler.buildQuery(category));
  }

  public async upsertManga (mangaToUpsert: MangaDataItem): Promise<MangaDataItem> {
    let dataToUpsert: Document<MangaDataItem>;
    if (mangaToUpsert._id !== undefined) {
      dataToUpsert = await this.dataHandler.findById(this.dataModel, mangaToUpsert._id);
      if (typeof dataToUpsert === 'undefined') {
        throw new Error('Could not find given manga to update');
      } else {
        dataToUpsert.set(mangaToUpsert);
      }
    } else {
      dataToUpsert = new this.dataModel(mangaToUpsert);
      dataToUpsert.set('_id', new Types.ObjectId());
    }
    dataToUpsert.set('time_updated', Date.now());
    return (await this.dataHandler.upsertItem(dataToUpsert)) as unknown as MangaDataItem;
  }
}
