import StandardProjectDataHandler from '../db/project/standard-project-data-handler';
import {ProjectDataItem} from '../objects/ProjectDataItem';

export default class ProjectHandler {
  private projectDataHandler: StandardProjectDataHandler;

  constructor(projectDataHandler: StandardProjectDataHandler) {
    this.projectDataHandler = projectDataHandler;
  }

  async getProjectById(id: string): Promise<ProjectDataItem> {
    return this.projectDataHandler.findProjectByRawId(id);
  }

  async lookupProjects(title: string, tags: Array<string>): Promise<Array<ProjectDataItem>> {
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

  async listProjects(currentPage: number, maxPerPage: number, visible: boolean) {
    return this.projectDataHandler.findAllProjects(
      Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'time_posted': -1 }, visible,
    );
  }

  async getTotalProjectCount(visible: boolean) {
    return this.projectDataHandler.getTotalProjectCount(visible);
  }

  async submitProject(projectDetails: ProjectDataItem): Promise<ProjectDataItem> {
    return this.projectDataHandler.upsertProject(projectDetails);
  }

  async deleteProject(projectIdToDelete: string): Promise<ProjectDataItem> {
    return this.projectDataHandler.deleteProjectById(projectIdToDelete);
  }
}
