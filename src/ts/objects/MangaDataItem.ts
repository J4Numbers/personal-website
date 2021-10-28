import BasicDataItem from './BasicDataItem';

export enum MangaStatus {
  COMPLETED='COMPLETED',
  CURRENT='CURRENT',
  PAUSED='PAUSED',
  DROPPED='DROPPED',
  PLANNING='PLANNING',
}

export interface MangaDataItem extends BasicDataItem {
  'last_hash':    string,
  'manga_id': {
    'ani_list'?:      number,
    'my_anime_list'?: number,
    'ani_db'?:        number,
  },

  'manga_status': string,
  'story_type':   string,
  'title':        {
    'romaji':  string,
    'english': string,
    'native':  string,
  },
  'score':        number,
  'status':       string,
  'total_vols':   number,
  'total_chaps':  number,
  'current_vol':  number,
  'current_chap': number,
  'synopsis':     string,
  'cover_img':    {
    'medium': string,
    'large':  string,
  },

  'tags'?:         Array<string>,
  'time_updated'?: Date,
  'review'?:       string,
}
