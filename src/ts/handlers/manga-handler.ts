import StandardMangaDataHandler from '../db/manga/standard-manga-data-handler';
import {MangaDataItem} from '../objects/MangaDataItem';

export default class MangaHandler {
  mangaDataHandler: StandardMangaDataHandler;

  constructor(mangaDataHandler: StandardMangaDataHandler) {
    this.mangaDataHandler = mangaDataHandler;
  }

  async getMangaById(id: string): Promise<MangaDataItem> {
    return this.mangaDataHandler.findMangaByRawId(id);
  }

  async lookupMangaAniListId(id: number): Promise<MangaDataItem | undefined> {
    const foundItems = await this.mangaDataHandler.findMangaStoriesByQuery(
      { 'manga_id.ani_list': id }, 0, 1, {});
    if (foundItems.length > 0) {
      return foundItems[0];
    } else {
      return undefined;
    }
  }

  async lookupMangaTitle(title: string, tags: Array<string>): Promise<Array<MangaDataItem>> {
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

  async lookupMangaStories(currentPage: number, maxPerPage: number, category='') {
    return this.mangaDataHandler.findMangaStories(
      Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'title.romaji': 1 }, category,
    );
  }

  async getTotalStoryCount(category='') {
    return this.mangaDataHandler.getTotalStoryCount(category);
  }

  async submitManga(editDetails: MangaDataItem): Promise<MangaDataItem> {
    return this.mangaDataHandler.upsertManga(editDetails);
  }
}
