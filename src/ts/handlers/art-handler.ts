import type { ArtDataItem } from '../objects/ArtDataItem';
import type StandardArtDataHandler from '../db/art/standard-art-data-handler';

export default class ArtHandler {
  private readonly artDataHandler: StandardArtDataHandler;

  public constructor (artDataHandler: StandardArtDataHandler) {
    this.artDataHandler = artDataHandler;
  }

  public async getArtById (id: string): Promise<ArtDataItem> {
    return this.artDataHandler.findArtByRawId(id);
  }

  public async lookupArtTitles (title: string, tags: Array<string>): Promise<Array<ArtDataItem>> {
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

  public async lookupArtPieces (
    currentPage: number, maxPerPage: number,
  ): Promise<Array<ArtDataItem>> {
    return this.artDataHandler.findAllArtPieces(
      Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'date_completed': -1 },
    );
  }

  public async getTotalArtCount (): Promise<number> {
    return this.artDataHandler.getTotalArtPieceCount();
  }

  public async submitArt (artDetails: ArtDataItem): Promise<ArtDataItem> {
    return this.artDataHandler.upsertArt(artDetails);
  }

  public async deleteArt (artIdToDelete: string): Promise<ArtDataItem> {
    return this.artDataHandler.deleteArtById(artIdToDelete);
  }
}
