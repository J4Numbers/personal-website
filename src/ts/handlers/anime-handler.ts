import StandardAnimeDataHandler from '../db/anime/standard-anime-data-handler';
import {AnimeDataItem} from '../objects/AnimeDataItem';

export default class AnimeHandler {
  animeDataHandler: StandardAnimeDataHandler;

  constructor(animeDataHandler: StandardAnimeDataHandler) {
    this.animeDataHandler = animeDataHandler;
  }

  async getAnimeById(id: string): Promise<AnimeDataItem> {
    return (await this.animeDataHandler.findAnimeByRawId(id)).toObject() as unknown as AnimeDataItem;
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
}
