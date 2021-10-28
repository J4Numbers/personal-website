import {ArtDataItem} from '../objects/ArtDataItem';
import StandardArtDataHandler from '../db/art/standard-art-data-handler';

export default class ArtHandler {
  artDataHandler: StandardArtDataHandler;

  constructor(artDataHandler: StandardArtDataHandler) {
    this.artDataHandler = artDataHandler;
  }

  async getArtById(id: string): Promise<ArtDataItem> {
    return this.artDataHandler.findArtByRawId(id);
  }

  async lookupArtTitles(title: string, tags: Array<string>): Promise<Array<ArtDataItem>> {
    return this.artDataHandler.findArtPiecesByQuery({
      $or: [
        {
          tags: {
            $all: tags,
          },
        },
        {
          'title': {
            $regex:   title,
            $options: 'i',
          },
        },
      ],
    }, 0, 10, { 'title': -1 });
  }

  async lookupArtPieces(currentPage: number, maxPerPage: number) {
    return this.artDataHandler.findAllArtPieces(
      Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'date_completed': -1 },
    );
  }

  async getTotalArtCount() {
    return this.artDataHandler.getTotalArtPieceCount();
  }

  async submitArt(artDetails: ArtDataItem): Promise<ArtDataItem> {
    return this.artDataHandler.upsertArt(artDetails);
  }

  async deleteArt(artIdToDelete: string): Promise<ArtDataItem> {
    return this.artDataHandler.deleteArtById(artIdToDelete);
  }
}
