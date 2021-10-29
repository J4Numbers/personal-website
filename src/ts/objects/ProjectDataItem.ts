import BasicDataItem from './BasicDataItem';
import {CommentDataItem} from './CommentDataItem';

export interface ProjectDataItem extends BasicDataItem {
  'short_title': string,
  'long_title': string,
  'public': boolean,
  'description': string,
  'time_posted': Date,
  'time_updated': Date,
  'tags': Array<string>,
  'comments': Array<CommentDataItem>,
}
