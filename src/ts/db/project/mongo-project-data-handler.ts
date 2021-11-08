import StandardProjectDataHandler from './standard-project-data-handler';
import type MongoConnectionHandler from '../handlers/mongo-connection-handler';
import type { Document, Model, QueryOptions, SortValues } from 'mongoose';
import { Date, Schema, Types } from 'mongoose';
import type { ProjectDataItem } from '../../objects/ProjectDataItem';

export default class MongoProjectDataHandler extends StandardProjectDataHandler {
  private readonly dataHandler: MongoConnectionHandler<ProjectDataItem>;

  private readonly dataSchema: Schema<ProjectDataItem>;

  private readonly dataModel: Model<ProjectDataItem>;

  public constructor (dataHandler: MongoConnectionHandler<ProjectDataItem>) {
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

  private static buildQuery (visible = false): QueryOptions {
    const query: QueryOptions = {};
    if (visible) {
      query.public = true;
    }
    return query;
  }

  public async deleteProjectById (projectIdToRemove: string): Promise<ProjectDataItem> {
    const projectToDelete = await this.findProjectByRawId(projectIdToRemove);
    await this.dataModel.deleteOne({ '_id': projectIdToRemove });
    return projectToDelete;
  }

  public async findAllProjects (
    skip: number, limit: number, sort: Record<string, SortValues>, visible: boolean,
  ): Promise<Array<ProjectDataItem>> {
    return this.dataHandler
      .findFromQuery(
        this.dataModel,
        MongoProjectDataHandler.buildQuery(visible),
        skip, limit, sort,
      );
  }

  public async findProjectByRawId (rawId: string): Promise<ProjectDataItem> {
    return this.dataHandler.findById(this.dataModel, rawId);
  }

  public async findProjectsByQuery (
    query: QueryOptions, skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<ProjectDataItem>> {
    return this.dataHandler.findFromQuery(this.dataModel, query, skip, limit, sort);
  }

  public async getTotalProjectCount (visible: boolean): Promise<number> {
    return this.dataHandler.getTotalCountFromQuery(
      this.dataModel, MongoProjectDataHandler.buildQuery(visible),
    );
  }

  public async upsertProject (projectToUpsert: ProjectDataItem): Promise<ProjectDataItem> {
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
