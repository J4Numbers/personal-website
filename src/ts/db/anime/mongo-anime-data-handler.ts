import StandardAnimeDataHandler from './standard-anime-data-handler';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import {AnimeDataItem, AnimeStatus} from '../../objects/AnimeDataItem';
import {Model, Schema, Date, SortValues, QueryOptions, Document} from 'mongoose';

export default class MongoAnimeDataHandler extends StandardAnimeDataHandler {
  dataHandler: MongoConnectionHandler<AnimeDataItem>;
  dataSchema: Schema<AnimeDataItem>;
  dataModel: Model<AnimeDataItem>;

  constructor(dataHandler: MongoConnectionHandler<AnimeDataItem>) {
    super();
    this.dataHandler = dataHandler;
    this.dataSchema = new Schema({
      '_id':       Schema.Types.ObjectId,
      'last_hash': String,
      'anime_id':  {
        'ani_list':      Number,
        'my_anime_list': Number,
        'ani_db':        Number,
      },
      'anime_status': String,
      'title':        {
        'romaji':  String,
        'english': String,
        'native':  String,
      },
      'score':      Number,
      'status':     String,
      'total_eps':  Number,
      'current_ep': Number,
      'synopsis':   String,
      'cover_img':  {
        'large':  String,
        'medium': String,
      },
      'tags':         Array,
      'time_updated': {
        type:    Schema.Types.Date,
        default: new Date(),
      },
      'review':       String,
    });
    this.dataModel = this.dataHandler.bootModel('AnimeShow', this.dataSchema);
  }

  async findAnimeByRawId(rawId: string): Promise<AnimeDataItem> {
    return this.dataHandler.findById(this.dataModel, rawId);
  }

  buildQuery (status = ''): QueryOptions {
    const query: QueryOptions = {};
    if (status !== 'all') {
      if (status === 'seen') {
        query.current_ep = { $gte: 1 };
      }
      if (status === 'completed') {
        query.status = AnimeStatus.COMPLETED;
      }
      if (status === 'watching') {
        query.status = AnimeStatus.CURRENT;
      }
      if (status === 'held') {
        query.status = AnimeStatus.PAUSED;
      }
      if (status === 'dropped') {
        query.status = AnimeStatus.DROPPED;
      }
      if (status === 'planned') {
        query.status = AnimeStatus.PLANNING;
      }
    }
    return query;
  }

  async findAnimeShows(skip: number, limit: number, sort: { [p: string]: SortValues }, category: string): Promise<Array<AnimeDataItem>> {
    return this.dataHandler
      .findFromQuery(this.dataModel, this.buildQuery(category), skip, limit, sort);
  }

  async findAnimeShowsByQuery(query: QueryOptions, skip: number, limit: number, sort: { [p: string]: SortValues }): Promise<Array<AnimeDataItem>> {
    return this.dataHandler.findFromQuery(this.dataModel, query, skip, limit, sort);
  }

  async getTotalShowCount(category: string): Promise<number> {
    return this.dataHandler
      .getTotalCountFromQuery(this.dataModel, this.buildQuery(category));
  }

  async upsertAnime(animeToUpsert: AnimeDataItem): Promise<AnimeDataItem> {
    let dataToUpsert: Document<AnimeDataItem>;
    if (animeToUpsert._id !== undefined) {
      dataToUpsert = await this.dataHandler.findById(this.dataModel, animeToUpsert._id);
      if (typeof dataToUpsert === 'undefined') {
        throw new Error('Could not find given anime to update');
      } else {
        dataToUpsert.set(animeToUpsert);
      }
    } else {
      dataToUpsert = new Document<AnimeDataItem>(animeToUpsert);
    }
    dataToUpsert.set('time_updated', Date.now());
    return (await this.dataHandler.upsertItem(dataToUpsert)) as unknown as AnimeDataItem;
  }
}
