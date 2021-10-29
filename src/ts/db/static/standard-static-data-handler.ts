import {StaticDataItem} from '../../objects/StaticDataItem';
import {StaticDocumentTypes} from '../../objects/StaticDocumentTypes';

export default abstract class StandardStaticDataHandler {
  abstract findStaticByType (rawId: StaticDocumentTypes): Promise<StaticDataItem>;

  abstract upsertStatic (staticToUpsert: StaticDataItem): Promise<StaticDataItem>;
}
