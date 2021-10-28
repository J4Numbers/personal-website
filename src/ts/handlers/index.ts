import resolveAnimeDataHandler from '../db/anime';
import resolveArtDataHandler from '../db/art';
import resolveMangaDataHandler from '../db/manga';
import AnimeHandler from './anime-handler';
import ArtHandler from './art-handler';
import MangaHandler from './manga-handler';
import ImportHandler from './import-handler';
import {fetchAniListDataScraper} from '../integration';

let animeHandler: AnimeHandler;
let artHandler: ArtHandler;
let importHandler: ImportHandler;
let mangaHandler: MangaHandler;

export function fetchAnimeHandler () {
  if (animeHandler === undefined) {
    animeHandler = new AnimeHandler(resolveAnimeDataHandler());
  }
  return animeHandler;
}

export function fetchArtHandler () {
  if (artHandler === undefined) {
    artHandler = new ArtHandler(resolveArtDataHandler());
  }
  return artHandler;
}

export function fetchImportHandler () {
  if (importHandler === undefined) {
    importHandler = new ImportHandler(
      fetchAniListDataScraper(), fetchAnimeHandler(), fetchMangaHandler(),
    );
  }
  return importHandler;
}

export function fetchMangaHandler () {
  if (mangaHandler === undefined) {
    mangaHandler = new MangaHandler(resolveMangaDataHandler());
  }
  return mangaHandler;
}
