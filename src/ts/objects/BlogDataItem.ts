import BasicDataItem from './BasicDataItem';
import {BlogCommentDataItem} from './BlogCommentDataItem';

export interface BlogDataItem extends BasicDataItem{
  'short_title':  string,
  'long_title':   string,
  'public':       boolean,
  'full_text':    string,
  'time_posted':  Date,
  'time_updated': Date,
  'tags':         Array<String>,
  'comments':     Array<BlogCommentDataItem>,
}
