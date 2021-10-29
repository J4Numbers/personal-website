import StandardProjectDataHandler from './standard-project-data-handler';
import MongoConnectionHandler from '../handlers/mongo-connection-handler';
import {Date, Document, Model, QueryOptions, Schema, SortValues, Types} from 'mongoose';
import {BlogDataItem} from '../../objects/BlogDataItem';
import {ProjectDataItem} from '../../objects/ProjectDataItem';

export default class MongoProjectDataHandler extends StandardProjectDataHandler {
  dataHandler: MongoConnectionHandler<ProjectDataItem>;
  dataSchema: Schema<ProjectDataItem>;
  dataModel: Model<ProjectDataItem>;

  constructor(dataHandler: MongoConnectionHandler<ProjectDataItem>) {
    super();
    this.dataHandler = dataHandler;
    this.dataSchema = new Schema({
      '_id':          Schema.Types.ObjectId,
      'short_title':  String,
      'long_title':   String,
      'public':       Boolean,
      'description':  String,
      'time_posted':  {
        type:    Schema.Types.Date,
        default: new Date(),
      },
      'time_updated': {
        type:    Schema.Types.Date,
        default: new Date(),
      },
      'tags':         Array,
      'comments':     Array,
    });
    this.dataModel = this.dataHandler.bootModel('DevProject', this.dataSchema);
  }

  async deleteProjectById(projectIdToRemove: string): Promise<ProjectDataItem> {
    const projectToDelete = await this.findProjectByRawId(projectIdToRemove);
    await this.dataModel.deleteOne({'_id': projectIdToRemove});
    return projectToDelete;
  }

  static buildQuery (visible = false): QueryOptions {
    const query: QueryOptions = {};
    if (visible) {
      query.public = true;
    }
    return query;
  }

  findAllProjects(skip: number, limit: number, sort: { [p: string]: SortValues }, visible: boolean): Promise<Array<ProjectDataItem>> {
    return this.dataHandler
      .findFromQuery(this.dataModel, MongoProjectDataHandler.buildQuery(visible), skip, limit, sort);
  }

  findProjectByRawId(rawId: string): Promise<ProjectDataItem> {
    return this.dataHandler.findById(this.dataModel, rawId);
  }

  findProjectsByQuery(query: QueryOptions, skip: number, limit: number, sort: { [p: string]: SortValues }): Promise<Array<ProjectDataItem>> {
    return this.dataHandler.findFromQuery(this.dataModel, query, skip, limit, sort);
  }

  getTotalProjectCount(visible: boolean): Promise<number> {
    return this.dataHandler.getTotalCountFromQuery(this.dataModel, MongoProjectDataHandler.buildQuery(visible));
  }

  async upsertProject(projectToUpsert: ProjectDataItem): Promise<ProjectDataItem> {
    let dataToUpsert: Document<ProjectDataItem>;
    if (projectToUpsert._id !== undefined) {
      dataToUpsert = await this.dataHandler.findById(this.dataModel, projectToUpsert._id);
      if (typeof dataToUpsert === 'undefined') {
        throw new Error('Could not find given project to update');
      } else {
        dataToUpsert.set(projectToUpsert);
      }
    } else {
      dataToUpsert = new this.dataModel(projectToUpsert);
      dataToUpsert.set('_id', new Types.ObjectId());
    }
    dataToUpsert.set('time_updated', Date.now());
    return (await this.dataHandler.upsertItem(dataToUpsert)) as unknown as ProjectDataItem;
  }

}
