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
const mongoMangaHandlerInstance = require('./MangaHandler').getHandler();

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

// ids, titles, mangaType, myStatus, score, currentVol, currentChap,
// totalVols, totalChaps, airingStatus, synopsis, coverImgs, hash
async function resolveInsertNewManga (newMangatoInsert) {
  logger.info(`Inserting new book with id ${newMangatoInsert.media.id}`);
  await mongoMangaHandlerInstance.addNewManga(
    {
      'ani_list':      newMangatoInsert.media.id,
      'my_anime_list': newMangatoInsert.media.idMal,
    },
    newMangatoInsert.media.title,
    newMangatoInsert.format,
    newMangatoInsert.status,
    newMangatoInsert.score,
    newMangatoInsert.progressVolumes,
    newMangatoInsert.progress,
    newMangatoInsert.media.volumes,
    newMangatoInsert.media.chapters,
    newMangatoInsert.media.status,
    newMangatoInsert.media.description,
    newMangatoInsert.media.coverImage,
    crypto.createHash('sha256').update(JSON.stringify(newMangatoInsert)).digest('hex'),
  );
}

async function resolveOverwriteExistingManga (oldId, newMangatoInsert) {
  logger.info(`Inserting new book with id ${newMangatoInsert.media.id}`);
  await mongoMangaHandlerInstance.updateExistingManga(
    oldId,
    {
      'ani_list':      newMangatoInsert.media.id,
      'my_anime_list': newMangatoInsert.media.idMal,
    },
    newMangatoInsert.media.title,
    newMangatoInsert.format,
    newMangatoInsert.status,
    newMangatoInsert.score,
    newMangatoInsert.progressVolumes,
    newMangatoInsert.progress,
    newMangatoInsert.media.volumes,
    newMangatoInsert.media.chapters,
    newMangatoInsert.media.status,
    newMangatoInsert.media.description,
    newMangatoInsert.media.coverImage,
    crypto.createHash('sha256').update(JSON.stringify(newMangatoInsert)).digest('hex'),
  );
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
      const record = await mongoMangaHandlerInstance
        .findMangaByAniListId(media.media.id);
      if (record.length > 0) {
        if (record[ 0 ].last_hash !== crypto.createHash('sha256')
          .update(JSON.stringify(media)).digest('hex')) {
          await resolveOverwriteExistingManga(record[ 0 ]._id, media);
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
