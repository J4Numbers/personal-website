import StandardAnimeDataHandler from '../db/anime/standard-anime-data-handler';
import {AnimeDataItem} from '../objects/AnimeDataItem';

export default class AnimeHandler {
  animeDataHandler: StandardAnimeDataHandler;

  constructor(animeDataHandler: StandardAnimeDataHandler) {
    this.animeDataHandler = animeDataHandler;
  }

  async getAnimeById(id: string): Promise<AnimeDataItem> {
    return this.animeDataHandler.findAnimeByRawId(id);
  }

  async lookupAnimeAniListId(id: number): Promise<AnimeDataItem | undefined> {
    const foundItems = await this.animeDataHandler.findAnimeShowsByQuery(
      { 'anime_id.ani_list': id }, 0, 1, {});
    if (foundItems.length > 0) {
      return foundItems[0];
    } else {
      return undefined;
    }
  }

  async lookupAnimeTitle(title: string, tags: Array<string>): Promise<Array<AnimeDataItem>> {
    return this.animeDataHandler.findAnimeShowsByQuery({
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

  async lookupAnimeShows(currentPage: number, maxPerPage: number, category='') {
    return this.animeDataHandler.findAnimeShows(
      Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'title.romaji': 1 }, category,
    );
  }

  async getTotalShowCount(category='') {
    return this.animeDataHandler.getTotalShowCount(category);
  }

  async submitAnime(editDetails: AnimeDataItem): Promise<AnimeDataItem> {
    return this.animeDataHandler.upsertAnime(editDetails);
  }
}
