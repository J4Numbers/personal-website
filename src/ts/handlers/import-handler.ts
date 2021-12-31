import crypto from 'crypto';
import type AniListDataScraper from '../integration/anilist-data-scraper';
import type AnimeHandler from './anime-handler';
import type MangaHandler from './manga-handler';

import bunyanLogger from '../logger/bunyan-logger';
import type { AniListAnimeDataItem } from '../objects/anilist/AniListAnimeDataItem';
import type { AniListMangaDataItem } from '../objects/anilist/AniListMangaDataItem';
import type { AnimeDataItem, AnimeStatus } from '../objects/AnimeDataItem';
import type { MangaDataItem } from '../objects/MangaDataItem';
import type { AniListTypes } from '../objects/anilist/AniListResponse';
const logger = bunyanLogger();

export default class ImportHandler {
  private readonly aniListDataScraper: AniListDataScraper;

  private readonly animeHandler: AnimeHandler;

  private readonly mangaHandler: MangaHandler;

  public constructor (
    aniListDataScraper: AniListDataScraper,
    animeHandler: AnimeHandler,
    mangaHandler: MangaHandler,
  ) {
    this.aniListDataScraper = aniListDataScraper;
    this.animeHandler = animeHandler;
    this.mangaHandler = mangaHandler;
  }

  private static buildAnimeDataObject (newAnimeToSubmit: AniListAnimeDataItem): AnimeDataItem {
    return {
      'last_hash': crypto.createHash('sha256')
        .update(JSON.stringify(newAnimeToSubmit))
        .digest('hex'),
      'anime_id':  {
        'ani_list': newAnimeToSubmit.media.id,
        'my_anime_list': newAnimeToSubmit.media.idMal,
      },

      'anime_status': newAnimeToSubmit.media.status as AnimeStatus,
      'title': newAnimeToSubmit.media.title,
      'score': newAnimeToSubmit.score,
      'status': newAnimeToSubmit.status,
      'total_eps': newAnimeToSubmit.media.episodes,
      'current_ep': newAnimeToSubmit.progress,
      'synopsis': newAnimeToSubmit.media.description,
      'cover_img': newAnimeToSubmit.media.coverImage,
    };
  }

  private static buildMangaDataObject (newMangaToSubmit: AniListMangaDataItem): MangaDataItem {
    return {
      'last_hash': crypto.createHash('sha256')
        .update(JSON.stringify(newMangaToSubmit))
        .digest('hex'),
      'manga_id': {
        'ani_list':      newMangaToSubmit.media.id,
        'my_anime_list': newMangaToSubmit.media.idMal,
      },

      'manga_status': newMangaToSubmit.media.status,
      'story_type':   newMangaToSubmit.media.format,
      'title':        newMangaToSubmit.media.title,
      'score':        newMangaToSubmit.score,
      'status':       newMangaToSubmit.status,
      'total_vols':   newMangaToSubmit.media.volumes,
      'total_chaps':  newMangaToSubmit.media.chapters,
      'current_vol':  newMangaToSubmit.progressVolumes,
      'current_chap': newMangaToSubmit.progress,
      'synopsis':     newMangaToSubmit.media.description,
      'cover_img':    newMangaToSubmit.media.coverImage,
    };
  }

  public async importAnimeAniListItems (): Promise<void> {
    let page = 1;
    let roller = await this.aniListDataScraper.getPageOfAniListAnimeResults(page);
    let mediaItems = roller.data.data.Page.mediaList;
    let promiseList: Array<Promise<void>> = [];
    while (mediaItems.length > 0) {
      logger.info(`Scraped ${mediaItems.length} shows from AniList`);
      promiseList = promiseList.concat(mediaItems.map((media) => this.resolveIndividualAnime(media)));
      ++page;
      roller = await this.aniListDataScraper.getPageOfAniListAnimeResults(page);
      mediaItems = roller.data.data.Page.mediaList;
    }
    await Promise.all(promiseList);
  }

  public async importMangaAniListItems (): Promise<void> {
    let page = 1;
    let roller = await this.aniListDataScraper.getPageOfAniListMangaResults(page);
    let mediaItems = roller.data.data.Page.mediaList;
    let promiseList: Array<Promise<void>> = [];
    while (mediaItems.length > 0) {
      logger.info(`Scraped ${mediaItems.length} books from AniList`);
      promiseList = promiseList.concat(mediaItems.map((media) => this.resolveIndividualManga(media)));
      ++page;
      roller = await this.aniListDataScraper.getPageOfAniListMangaResults(page);
      mediaItems = roller.data.data.Page.mediaList;
    }
    await Promise.all(promiseList);
  }

  private async resolveInsertNewAnime (
    newAnimetoInsert: AniListAnimeDataItem,
  ): Promise<AnimeDataItem> {
    logger.info(`Inserting new show with id ${newAnimetoInsert.media.id}`);
    return this.animeHandler.submitAnime(ImportHandler.buildAnimeDataObject(newAnimetoInsert));
  }

  private async resolveOverwriteExistingAnime (
    oldId: string, oldAnimeToOverwrite: AniListAnimeDataItem,
  ): Promise<AnimeDataItem> {
    logger.info(`Overwriting existing show with id ${oldAnimeToOverwrite.media.id}`);
    return this.animeHandler.submitAnime({
      '_id': oldId,
      ...ImportHandler.buildAnimeDataObject(oldAnimeToOverwrite),
    });
  }

  private async resolveIndividualAnime (media: AniListTypes): Promise<void> {
    const record = await this.animeHandler.lookupAnimeAniListId(media.media.id);
    if (record !== undefined) {
      const currentHash = crypto.createHash('sha256')
        .update(JSON.stringify(media))
        .digest('hex');
      logger.debug(
        `Comparing last hash '${record.last_hash}' against current hash '${currentHash}'`,
      );
      if (record.last_hash !== currentHash) {
        await this.resolveOverwriteExistingAnime(
          record._id as string, media as AniListAnimeDataItem,
        );
      }
    } else {
      await this.resolveInsertNewAnime(media as AniListAnimeDataItem);
    }
  }

  private async resolveInsertNewManga (
    newMangaToInsert: AniListMangaDataItem,
  ): Promise<MangaDataItem> {
    logger.info(`Inserting new book with id ${newMangaToInsert.media.id}`);
    return this.mangaHandler.submitManga(ImportHandler.buildMangaDataObject(newMangaToInsert));
  }

  private async resolveOverwriteExistingManga (
    oldId: string, newMangaToInsert: AniListMangaDataItem,
  ): Promise<MangaDataItem> {
    logger.info(`Updating existing book with id ${newMangaToInsert.media.id}`);
    return this.mangaHandler.submitManga({
      '_id': oldId,
      ...ImportHandler.buildMangaDataObject(newMangaToInsert),
    });
  }

  private async resolveIndividualManga (media: AniListTypes): Promise<void> {
    const record = await this.mangaHandler.lookupMangaAniListId(media.media.id);
    if (record !== undefined) {
      const currentHash = crypto.createHash('sha256')
        .update(JSON.stringify(media))
        .digest('hex');
      logger.debug(
        `Comparing last hash '${record.last_hash}' against current hash '${currentHash}'`,
      );
      if (record.last_hash !== currentHash) {
        await this.resolveOverwriteExistingManga(
          record._id as string, media as AniListMangaDataItem,
        );
      }
    } else {
      await this.resolveInsertNewManga(media as AniListMangaDataItem);
    }
  }
}
