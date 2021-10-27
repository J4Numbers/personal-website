import AnimeHandler from './anime-handler';
import resolveAnimeDataHandler from '../db/anime';

let animeHandler: AnimeHandler;

export function fetchAnimeHandler () {
  if (animeHandler === undefined) {
    animeHandler = new AnimeHandler(resolveAnimeDataHandler());
  }
  return animeHandler;
}
