import BasicDataItem from './BasicDataItem';

export interface StoryDataItem extends BasicDataItem {
  'story_status': string,
  'story_type': string,
  'title': string,
  'synopsis': string,
  'cover_img': string,
  'chapters': Array<string>,
  'time_posted': Date,
  'time_updated': Date,
  'tags': Array<string>,
  'meta_review': string,
}
