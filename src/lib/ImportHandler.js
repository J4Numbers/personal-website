// MIT License
//
// Copyright (c) 2019 Jayne Doe
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const crypto = require('crypto');

const aniListHandlerInstance = require('./AniListHandler').getHandler();
const animeHandler = require('../js/handlers').fetchAnimeHandler();
const mangaHandler = require('../js/handlers').fetchMangaHandler();

const logger = require('./logger').bunyanLogger();

function buildAnimeDataObject (newAnimeToSubmit) {
  return {
    'last_hash': crypto.createHash('sha256').update(JSON.stringify(newAnimeToSubmit)).digest('hex'),
    'anime_id':  {
      'ani_list': newAnimeToSubmit.media.id,
      'my_anime_list': newAnimeToSubmit.media.idMal,
    },

    'anime_status': newAnimeToSubmit.media.status,
    'title': newAnimeToSubmit.media.title,
    'score': newAnimeToSubmit.score,
    'status': newAnimeToSubmit.status,
    'total_eps': newAnimeToSubmit.media.episodes,
    'current_ep': newAnimeToSubmit.progress,
    'synopsis': newAnimeToSubmit.media.description,
    'cover_img': newAnimeToSubmit.media.coverImage,
  };
}

function buildMangaDataObject (newMangaToSubmit) {
  return {
    'last_hash': crypto.createHash('sha256').update(JSON.stringify(newMangaToSubmit)).digest('hex'),
    'manga_id': {
      'ani_list':      newMangaToSubmit.media.id,
      'my_anime_list': newMangaToSubmit.media.idMal,
    },

    'manga_status': newMangaToSubmit.media.status,
    'story_type':   newMangaToSubmit.format,
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

async function resolveInsertNewAnime (newAnimetoInsert) {
  logger.info(`Inserting new show with id ${newAnimetoInsert.media.id}`);
  await animeHandler.submitAnime(buildAnimeDataObject(newAnimetoInsert));
}

async function resolveOverwriteExistingAnime (oldId, oldAnimeToOverwrite) {
  logger.info(`Overwriting existing show with id ${oldAnimeToOverwrite.media.id}`);
  await animeHandler.submitAnime({
    '_id': oldId,
    ...buildAnimeDataObject(oldAnimeToOverwrite),
  });
}

async function resolveInsertNewManga (newMangaToInsert) {
  logger.info(`Inserting new book with id ${newMangaToInsert.media.id}`);
  await mangaHandler.submitManga(buildMangaDataObject(newMangaToInsert));
}

async function resolveOverwriteExistingManga (oldId, newMangaToInsert) {
  logger.info(`Inserting new book with id ${newMangaToInsert.media.id}`);
  await mangaHandler.submitManga({
    '_id': oldId,
    ...buildMangaDataObject(newMangaToInsert),
  });
}

async function importAnimeAniListItemsIntoMongo () {
  let page = 1;
  let roller = await aniListHandlerInstance.getPageOfAniListAnimeResults(page);
  let mediaItems = roller.data.Page.mediaList;
  while (mediaItems.length > 0) {
    logger.info(`Scraped ${mediaItems.length} shows from AniList`);
    mediaItems.forEach(async (media) => {
      const record = await animeHandler
        .lookupAnimeAniListId(media.media.id);
      if (record !== undefined) {
        if (record.last_hash !== crypto.createHash('sha256')
          .update(JSON.stringify(media)).digest('hex')) {
          await resolveOverwriteExistingAnime(record._id, media);
        }
      } else {
        await resolveInsertNewAnime(media);
      }
    });
    ++page;
    roller = await aniListHandlerInstance.getPageOfAniListAnimeResults(page);
    mediaItems = roller.data.Page.mediaList;
  }
}

async function importMangaAniListItemsIntoMongo () {
  let page = 1;
  let roller = await aniListHandlerInstance.getPageOfAniListMangaResults(page);
  let mediaItems = roller.data.Page.mediaList;
  while (mediaItems.length > 0) {
    logger.info(`Scraped ${mediaItems.length} books from AniList`);
    mediaItems.forEach(async (media) => {
      const record = await mangaHandler
        .lookupMangaAniListId(media.media.id);
      if (record !== undefined) {
        if (record.last_hash !== crypto.createHash('sha256')
          .update(JSON.stringify(media)).digest('hex')) {
          await resolveOverwriteExistingManga(record._id, media);
        }
      } else {
        await resolveInsertNewManga(media);
      }
    });
    ++page;
    roller = await aniListHandlerInstance.getPageOfAniListMangaResults(page);
    mediaItems = roller.data.Page.mediaList;
  }
}

module.exports = {
  importAnimeIntoMongo: importAnimeAniListItemsIntoMongo,
  importMangaIntoMongo: importMangaAniListItemsIntoMongo,
};
