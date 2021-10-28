import crypto from 'crypto';
import AniListDataScraper from '../integration/anilist-data-scraper';
import AnimeHandler from './anime-handler';
import MangaHandler from './manga-handler';

import bunyan_logger from '../logger/bunyan_logger';
import {AniListAnimeDataItem} from '../objects/anilist/AniListAnimeDataItem';
import {AniListMangaDataItem} from '../objects/anilist/AniListMangaDataItem';
import {AnimeDataItem, AnimeStatus} from '../objects/AnimeDataItem';
import {MangaDataItem} from '../objects/MangaDataItem';
const logger = bunyan_logger();

export default class ImportHandler {
  private aniListDataScraper: AniListDataScraper;
  private animeHandler: AnimeHandler;
  private mangaHandler: MangaHandler;

  constructor(aniListDataScraper: AniListDataScraper, animeHandler: AnimeHandler, mangaHandler: MangaHandler) {
    this.aniListDataScraper = aniListDataScraper;
    this.animeHandler = animeHandler;
    this.mangaHandler = mangaHandler;
  }

  private static buildAnimeDataObject (newAnimeToSubmit: AniListAnimeDataItem): AnimeDataItem {
    return {
      'last_hash': crypto.createHash('sha256').update(JSON.stringify(newAnimeToSubmit)).digest('hex'),
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
      'last_hash': crypto.createHash('sha256').update(JSON.stringify(newMangaToSubmit)).digest('hex'),
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

  private resolveInsertNewAnime (newAnimetoInsert: AniListAnimeDataItem) {
    logger.info(`Inserting new show with id ${newAnimetoInsert.media.id}`);
    return this.animeHandler.submitAnime(ImportHandler.buildAnimeDataObject(newAnimetoInsert));
  }

  private resolveOverwriteExistingAnime (oldId: string, oldAnimeToOverwrite: AniListAnimeDataItem) {
    logger.info(`Overwriting existing show with id ${oldAnimeToOverwrite.media.id}`);
    return this.animeHandler.submitAnime({
      '_id': oldId,
      ...ImportHandler.buildAnimeDataObject(oldAnimeToOverwrite),
    });
  }

  private resolveInsertNewManga (newMangaToInsert: AniListMangaDataItem) {
    logger.info(`Inserting new book with id ${newMangaToInsert.media.id}`);
    return this.mangaHandler.submitManga(ImportHandler.buildMangaDataObject(newMangaToInsert));
  }

  private resolveOverwriteExistingManga (oldId: string, newMangaToInsert: AniListMangaDataItem) {
    logger.info(`Updating existing book with id ${newMangaToInsert.media.id}`);
    return this.mangaHandler.submitManga({
      '_id': oldId,
      ...ImportHandler.buildMangaDataObject(newMangaToInsert),
    });
  }

  async importAnimeAniListItems () {
    let page = 1;
    let roller = await this.aniListDataScraper.getPageOfAniListAnimeResults(page);
    let mediaItems = roller.data.data.Page.mediaList;
    while (mediaItems.length > 0) {
      logger.info(`Scraped ${mediaItems.length} shows from AniList`);
      mediaItems.forEach(async (media) => {
        const record = await this.animeHandler.lookupAnimeAniListId(media.media.id);
        if (record !== undefined) {
          if (record.last_hash !== crypto.createHash('sha256')
              .update(JSON.stringify(media)).digest('hex')) {
            await this.resolveOverwriteExistingAnime(record._id as string, media as AniListAnimeDataItem);
          }
        } else {
          await this.resolveInsertNewAnime(media as AniListAnimeDataItem);
        }
      });
      ++page;
      roller = await this.aniListDataScraper.getPageOfAniListAnimeResults(page);
      mediaItems = roller.data.data.Page.mediaList;
    }
  }

  async importMangaAniListItems () {
    let page = 1;
    let roller = await this.aniListDataScraper.getPageOfAniListMangaResults(page);
    let mediaItems = roller.data.data.Page.mediaList;
    while (mediaItems.length > 0) {
      logger.info(`Scraped ${mediaItems.length} books from AniList`);
      mediaItems.forEach(async (media) => {
        const record = await this.mangaHandler.lookupMangaAniListId(media.media.id);
        if (record !== undefined) {
          const currentHash = crypto.createHash('sha256').update(JSON.stringify(media)).digest('hex')
          logger.debug(`Comparing last hash '${record.last_hash}' against current hash '${currentHash}'`);
          if (record.last_hash !== currentHash) {
            await this,this.resolveOverwriteExistingManga(record._id as string, media as AniListMangaDataItem);
          }
        } else {
          await this.resolveInsertNewManga(media as AniListMangaDataItem);
        }
      });
      ++page;
      roller = await this.aniListDataScraper.getPageOfAniListMangaResults(page);
      mediaItems = roller.data.data.Page.mediaList;
    }
  }
}
