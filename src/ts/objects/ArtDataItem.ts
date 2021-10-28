import BasicDataItem from './BasicDataItem';

export interface ArtDataItem extends BasicDataItem{
  'title': string,
  'image': {
    'full_size': string,
    'thumb':     string,
  },
  'date_completed': Date,
  'tags': Array<string>,
  'time_updated': Date,
  'notes': string,
}
