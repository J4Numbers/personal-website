import {QueryOptions, SortValues} from 'mongoose';
import {ProjectDataItem} from '../../objects/ProjectDataItem';

export default abstract class StandardProjectDataHandler {
  abstract findProjectByRawId (rawId: string): Promise<ProjectDataItem>;

  abstract findAllProjects (skip: number, limit: number, sort: { [key: string]: SortValues }, visible: boolean): Promise<Array<ProjectDataItem>>;

  abstract findProjectsByQuery (query: QueryOptions, skip: number, limit: number, sort: { [key: string]: SortValues }): Promise<Array<ProjectDataItem>>;

  abstract getTotalProjectCount (visible: boolean): Promise<number>;

  abstract upsertProject (projectToUpsert: ProjectDataItem): Promise<ProjectDataItem>;

  abstract deleteProjectById (projectIdToRemove: string): Promise<ProjectDataItem>;
}
