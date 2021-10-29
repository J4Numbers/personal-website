import BasicDataItem from './BasicDataItem';
import {StaticDocument} from './StaticDocument';

export interface StaticDataItem extends BasicDataItem {
  content: StaticDocument,
  time_updated: Date,
}
