import type StandardProjectDataHandler from '../db/project/standard-project-data-handler';
import type { ProjectDataItem } from '../objects/ProjectDataItem';

export default class ProjectHandler {
  private readonly projectDataHandler: StandardProjectDataHandler;

  public constructor (projectDataHandler: StandardProjectDataHandler) {
    this.projectDataHandler = projectDataHandler;
  }

  public async getProjectById (id: string): Promise<ProjectDataItem> {
    return this.projectDataHandler.findProjectByRawId(id);
  }

  public async lookupProjects (
    title: string, tags: Array<string>,
  ): Promise<Array<ProjectDataItem>> {
    return this.projectDataHandler.findProjectsByQuery({
      $or: [
        {
          tags: {
            $all: tags,
          },
        },
        {
          'long_title': {
            $regex:   title,
            $options: 'i',
          },
        },
      ],
    }, 0, 10, { 'long_title': -1 });
  }

  public async listProjects (
    currentPage: number, maxPerPage: number, visible: boolean,
  ): Promise<Array<ProjectDataItem>> {
    return this.projectDataHandler.findAllProjects(
      Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'time_posted': -1 }, visible,
    );
  }

  public async getTotalProjectCount (visible: boolean): Promise<number> {
    return this.projectDataHandler.getTotalProjectCount(visible);
  }

  public async submitProject (projectDetails: ProjectDataItem): Promise<ProjectDataItem> {
    return this.projectDataHandler.upsertProject(projectDetails);
  }

  public async deleteProject (projectIdToDelete: string): Promise<ProjectDataItem> {
    return this.projectDataHandler.deleteProjectById(projectIdToDelete);
  }
}
