import type StandardAnimeDataHandler from '../db/anime/standard-anime-data-handler';
import type { AnimeDataItem } from '../objects/AnimeDataItem';

export default class AnimeHandler {
  private readonly animeDataHandler: StandardAnimeDataHandler;

  public constructor (animeDataHandler: StandardAnimeDataHandler) {
    this.animeDataHandler = animeDataHandler;
  }

  public async getAnimeById (id: string): Promise<AnimeDataItem> {
    return this.animeDataHandler.findAnimeByRawId(id);
  }

  public async lookupAnimeAniListId (id: number): Promise<AnimeDataItem | undefined> {
    const foundItems = await this.animeDataHandler.findAnimeShowsByQuery(
      { 'anime_id.ani_list': id }, 0, 1, {},
    );
    if (foundItems.length > 0) {
      return foundItems[ 0 ];
    }
    return undefined;
  }

  public async lookupAnimeTitle (
    title: string, tags: Array<string>,
  ): Promise<Array<AnimeDataItem>> {
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

  public async lookupAnimeShows (
    currentPage: number, maxPerPage: number, category = '',
  ): Promise<Array<AnimeDataItem>> {
    return this.animeDataHandler.findAnimeShows(
      Math.max(0, (currentPage - 1)) * maxPerPage,
      maxPerPage, { 'title.romaji': 1 }, category,
    );
  }

  public async getTotalShowCount (category = ''): Promise<number> {
    return this.animeDataHandler.getTotalShowCount(category);
  }

  public async submitAnime (editDetails: AnimeDataItem): Promise<AnimeDataItem> {
    return this.animeDataHandler.upsertAnime(editDetails);
  }
}
