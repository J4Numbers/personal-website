import BasicDataItem from './BasicDataItem';

export enum AnimeStatus {
  COMPLETED='COMPLETED',
  CURRENT='CURRENT',
  PAUSED='PAUSED',
  DROPPED='DROPPED',
  PLANNING='PLANNING',
}

export interface AnimeDataItem extends BasicDataItem {
  'last_hash': string,
  'anime_id':  {
    'ani_list'?:      number,
    'my_anime_list'?: number,
    'ani_db'?:        number,
  },

  'anime_status': AnimeStatus,
  'title': {
    'romaji':  string,
    'english': string,
    'native':  string,
  },
  'score':      number,
  'status':     string,
  'total_eps':  number,
  'current_ep': number,
  'synopsis':   string,
  'cover_img': {
    'large':  string,
    'medium': string,
  },

  'tags'?:         Array<string>,
  'time_updated'?: Date,
  'review'?:       string,
}
