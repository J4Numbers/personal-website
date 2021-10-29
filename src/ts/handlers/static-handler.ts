import {StaticDocumentTypes} from '../objects/StaticDocumentTypes';
import StandardStaticDataHandler from '../db/static/standard-static-data-handler';
import {StaticDataItem} from '../objects/StaticDataItem';

export default class StaticHandler {
  private staticDataHandler: StandardStaticDataHandler;

  constructor(staticDataHandler: StandardStaticDataHandler) {
    this.staticDataHandler = staticDataHandler;
  }

  async getStaticById(id: StaticDocumentTypes): Promise<StaticDataItem> {
    return this.staticDataHandler.findStaticByType(id);
  }

  async submitStatic(staticDetails: StaticDataItem): Promise<StaticDataItem> {
    return this.staticDataHandler.upsertStatic(staticDetails);
  }
}
