import resolveAnimeDataHandler from '../db/anime';
import resolveArtDataHandler from '../db/art';
import resolveBlogDataHandler from '../db/blog';
import resolveProjectDataHandler from '../db/project';
import resolveMangaDataHandler from '../db/manga';
import AnimeHandler from './anime-handler';
import ArtHandler from './art-handler';
import MangaHandler from './manga-handler';
import ImportHandler from './import-handler';
import {fetchAniListDataScraper} from '../integration';
import BlogHandler from './blog-handler';
import ProjectHandler from './project-handler';

let animeHandler: AnimeHandler;
let artHandler: ArtHandler;
let blogHandler: BlogHandler;
let importHandler: ImportHandler;
let projectHandler: ProjectHandler;
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

export function fetchBlogHandler () {
  if (blogHandler === undefined) {
    blogHandler = new BlogHandler(resolveBlogDataHandler());
  }
  return blogHandler;
}

export function fetchImportHandler () {
  if (importHandler === undefined) {
    importHandler = new ImportHandler(
      fetchAniListDataScraper(), fetchAnimeHandler(), fetchMangaHandler(),
    );
  }
  return importHandler;
}

export function fetchProjectHandler () {
  if (projectHandler === undefined) {
    projectHandler = new ProjectHandler(resolveProjectDataHandler());
  }
  return projectHandler;
}

export function fetchMangaHandler () {
  if (mangaHandler === undefined) {
    mangaHandler = new MangaHandler(resolveMangaDataHandler());
  }
  return mangaHandler;
}
