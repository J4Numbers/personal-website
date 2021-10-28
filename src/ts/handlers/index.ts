import resolveAnimeDataHandler from '../db/anime';
import resolveMangaDataHandler from '../db/manga';
import AnimeHandler from './anime-handler';
import MangaHandler from './manga-handler';

let animeHandler: AnimeHandler;
let mangaHandler: MangaHandler;

export function fetchAnimeHandler () {
  if (animeHandler === undefined) {
    animeHandler = new AnimeHandler(resolveAnimeDataHandler());
  }
  return animeHandler;
}

export function fetchMangaHandler () {
  if (mangaHandler === undefined) {
    mangaHandler = new MangaHandler(resolveMangaDataHandler());
  }
  return mangaHandler;
}
