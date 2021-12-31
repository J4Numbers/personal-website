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
import { fetchAniListDataScraper } from '../integration';
import BlogHandler from './blog-handler';
import ProjectHandler from './project-handler';
import StaticHandler from './static-handler';
import TokenHandler from './token-handler';
import WritingHandler from './writing-handler';

let animeHandler: AnimeHandler | undefined;
let artHandler: ArtHandler | undefined;
let blogHandler: BlogHandler | undefined;
let importHandler: ImportHandler | undefined;
let projectHandler: ProjectHandler | undefined;
let mangaHandler: MangaHandler | undefined;
let staticHandler: StaticHandler | undefined;
let tokenHandler: TokenHandler | undefined;
let writingHandler: WritingHandler | undefined;

export function fetchAnimeHandler (): AnimeHandler {
  if (animeHandler === undefined) {
    animeHandler = new AnimeHandler(resolveAnimeDataHandler());
  }
  return animeHandler;
}

export function fetchArtHandler (): ArtHandler {
  if (artHandler === undefined) {
    artHandler = new ArtHandler(resolveArtDataHandler());
  }
  return artHandler;
}

export function fetchBlogHandler (): BlogHandler {
  if (blogHandler === undefined) {
    blogHandler = new BlogHandler(resolveBlogDataHandler());
  }
  return blogHandler;
}

export function fetchImportHandler (): ImportHandler {
  if (importHandler === undefined) {
    importHandler = new ImportHandler(
      fetchAniListDataScraper(), fetchAnimeHandler(), fetchMangaHandler(),
    );
  }
  return importHandler;
}

export function fetchProjectHandler (): ProjectHandler {
  if (projectHandler === undefined) {
    projectHandler = new ProjectHandler(resolveProjectDataHandler());
  }
  return projectHandler;
}

export function fetchMangaHandler (): MangaHandler {
  if (mangaHandler === undefined) {
    mangaHandler = new MangaHandler(resolveMangaDataHandler());
  }
  return mangaHandler;
}

export function fetchStaticHandler (): StaticHandler {
  if (staticHandler === undefined) {
    staticHandler = new StaticHandler(resolveStaticDataHandler());
  }
  return staticHandler;
}

export function fetchTokenHandler (): TokenHandler {
  if (tokenHandler === undefined) {
    tokenHandler = new TokenHandler(
      fs.readFileSync(config.get('jwt.public_cert')),
      fs.readFileSync(config.get('jwt.private_key')),
    );
  }
  return tokenHandler;
}

export function fetchWritingHandler (): WritingHandler {
  if (writingHandler === undefined) {
    writingHandler = new WritingHandler(
      resolveStoryDataHandler(), resolveChapterDataHandler(),
    );
  }
  return writingHandler;
}
