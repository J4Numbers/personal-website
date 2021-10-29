import fs from 'fs';
import config from 'config';

import resolveAnimeDataHandler from '../db/anime';
import resolveArtDataHandler from '../db/art';
import resolveBlogDataHandler from '../db/blog';
import resolveChapterDataHandler from '../db/chapter';
import resolveProjectDataHandler from '../db/project';
import resolveMangaDataHandler from '../db/manga';
import resolveStaticDataHandler from '../db/static';
import resolveStoryDataHandler from '../db/story';
import AnimeHandler from './anime-handler';
import ArtHandler from './art-handler';
import MangaHandler from './manga-handler';
import ImportHandler from './import-handler';
import {fetchAniListDataScraper} from '../integration';
import BlogHandler from './blog-handler';
import ProjectHandler from './project-handler';
import StaticHandler from './static-handler';
import TokenHandler from './token-handler';
import WritingHandler from './writing-handler';

let animeHandler: AnimeHandler;
let artHandler: ArtHandler;
let blogHandler: BlogHandler;
let importHandler: ImportHandler;
let projectHandler: ProjectHandler;
let mangaHandler: MangaHandler;
let staticHandler: StaticHandler;
let tokenHandler: TokenHandler;
let writingHandler: WritingHandler;

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

export function fetchStaticHandler () {
  if (staticHandler === undefined) {
    staticHandler = new StaticHandler(resolveStaticDataHandler());
  }
  return staticHandler;
}

export function fetchTokenHandler () {
  if (tokenHandler === undefined) {
    tokenHandler = new TokenHandler(
      fs.readFileSync(config.get('jwt.public_cert')),
      fs.readFileSync(config.get('jwt.private_key')),
    );
  }
  return tokenHandler;
}

export function fetchWritingHandler () {
  if (writingHandler === undefined) {
    writingHandler = new WritingHandler(
      resolveStoryDataHandler(), resolveChapterDataHandler(),
    );
  }
  return writingHandler;
}
