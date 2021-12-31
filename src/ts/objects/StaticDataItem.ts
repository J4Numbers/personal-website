import type BasicDataItem from './BasicDataItem';
import type { StaticDocument } from './StaticDocument';

export interface StaticDataItem extends BasicDataItem {
  content: StaticDocument;
  time_updated: Date;
}
