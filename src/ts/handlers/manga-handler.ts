import type StandardMangaDataHandler from '../db/manga/standard-manga-data-handler';
import type { MangaDataItem } from '../objects/MangaDataItem';

export default class MangaHandler {
  private readonly mangaDataHandler: StandardMangaDataHandler;

  public constructor (mangaDataHandler: StandardMangaDataHandler) {
    this.mangaDataHandler = mangaDataHandler;
  }

  public async getMangaById (id: string): Promise<MangaDataItem> {
    return this.mangaDataHandler.findMangaByRawId(id);
  }

  public async lookupMangaAniListId (id: number): Promise<MangaDataItem | undefined> {
    const foundItems = await this.mangaDataHandler.findMangaStoriesByQuery(
      { 'manga_id.ani_list': id }, 0, 1, {},
    );
    if (foundItems.length > 0) {
      return foundItems[ 0 ];
    }
    return undefined;
  }

  public async lookupMangaTitle (
    title: string, tags: Array<string>,
  ): Promise<Array<MangaDataItem>> {
    return this.mangaDataHandler.findMangaStoriesByQuery({
      $or: [
        {
          tags: {
            $all: tags,
          },
        },
        {
          'title.romaji': {
            $regex:   title,
            $options: 'i',
          },
        },
      ],
    }, 0, 10, { 'title.romaji': -1 });
  }

  public async lookupMangaStories (
    currentPage: number, maxPerPage: number, category = '',
  ): Promise<Array<MangaDataItem>> {
    return this.mangaDataHandler.findMangaStories(
      Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'title.romaji': 1 }, category,
    );
  }

  public async getTotalStoryCount (category = ''): Promise<number> {
    return this.mangaDataHandler.getTotalStoryCount(category);
  }

  public async submitManga (editDetails: MangaDataItem): Promise<MangaDataItem> {
    return this.mangaDataHandler.upsertManga(editDetails);
  }
}
