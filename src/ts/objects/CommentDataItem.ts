import BasicDataItem from './BasicDataItem';

export interface CommentDataItem extends BasicDataItem{
  'comment': string,
  'author': string,
  'time_posted': Date,
}
