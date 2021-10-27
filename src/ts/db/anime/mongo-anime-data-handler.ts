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

  async addNewAnime(newAnime: AnimeDataItem): Promise<Document<AnimeDataItem>> {
    let animeToSave = new this.dataModel(newAnime);
    return this.upsertAnime(animeToSave);
  }

  async editAnime(animeId: string, reviewText: string, tagList: Array<string>): Promise<Document<AnimeDataItem>> {
    let oldAnimeShow = await this.findAnimeByRawId(animeId);
    if (typeof oldAnimeShow === 'undefined') {
      throw new Error('Could not find given show to update');
    } else {
      oldAnimeShow.set('review', reviewText);
      oldAnimeShow.set('tags', tagList);
      oldAnimeShow.set('time_updated', Date.now());
      return this.upsertAnime(oldAnimeShow);
    }
  }

  async findAnimeByAniListId(aniListId: number): Promise<Array<AnimeDataItem>> {
    return this.dataHandler
      .findFromQuery(this.dataModel, { 'anime_id.ani_list': aniListId }, 0, 1, {});
  }

  async findAnimeByRawId(rawId: string): Promise<Document<AnimeDataItem>> {
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

  async updateExistingAnime(updatedAnime: AnimeDataItem): Promise<Document<AnimeDataItem>> {
    let oldAnimeItem = await this.findAnimeByRawId(updatedAnime._id);
    if (typeof oldAnimeItem === 'undefined') {
      throw new Error('Could not find given anime to update');
    } else {
      oldAnimeItem.set(updatedAnime);
      return this.upsertAnime(oldAnimeItem);
    }
  }

  async upsertAnime(animeToUpsert: Document<AnimeDataItem>): Promise<Document<AnimeDataItem>> {
    return this.dataHandler.upsertItem(animeToUpsert);
  }
}
