import type { StaticDocumentTypes } from '../objects/StaticDocumentTypes';
import type StandardStaticDataHandler from '../db/static/standard-static-data-handler';
import type { StaticDataItem } from '../objects/StaticDataItem';

export default class StaticHandler {
  private readonly staticDataHandler: StandardStaticDataHandler;

  public constructor (staticDataHandler: StandardStaticDataHandler) {
    this.staticDataHandler = staticDataHandler;
  }

  public async getStaticById (id: StaticDocumentTypes): Promise<StaticDataItem> {
    return this.staticDataHandler.findStaticByType(id);
  }

  public async submitStatic (staticDetails: StaticDataItem): Promise<StaticDataItem> {
    return this.staticDataHandler.upsertStatic(staticDetails);
  }
}
