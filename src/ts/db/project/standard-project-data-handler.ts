import type { QueryOptions, SortValues } from 'mongoose';
import type { ProjectDataItem } from '../../objects/ProjectDataItem';

export default abstract class StandardProjectDataHandler {
  public abstract findProjectByRawId (rawId: string): Promise<ProjectDataItem>;

  public abstract findAllProjects (
    skip: number, limit: number, sort: Record<string, SortValues>, visible: boolean,
  ): Promise<Array<ProjectDataItem>>;

  public abstract findProjectsByQuery (
    query: QueryOptions, skip: number, limit: number, sort: Record<string, SortValues>,
  ): Promise<Array<ProjectDataItem>>;

  public abstract getTotalProjectCount (visible: boolean): Promise<number>;

  public abstract upsertProject (projectToUpsert: ProjectDataItem): Promise<ProjectDataItem>;

  public abstract deleteProjectById (projectIdToRemove: string): Promise<ProjectDataItem>;
}
