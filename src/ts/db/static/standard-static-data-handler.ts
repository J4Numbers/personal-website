import type { StaticDataItem } from '../../objects/StaticDataItem';
import type { StaticDocumentTypes } from '../../objects/StaticDocumentTypes';

export default abstract class StandardStaticDataHandler {
  public abstract findStaticByType (rawId: StaticDocumentTypes): Promise<StaticDataItem>;

  public abstract upsertStatic (staticToUpsert: StaticDataItem): Promise<StaticDataItem>;
}
