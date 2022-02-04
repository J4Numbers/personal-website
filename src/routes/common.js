const errors = require('restify-errors');

const animeHandler = require('../js/handlers').fetchAnimeHandler();
const artHandler = require('../js/handlers').fetchArtHandler();
const blogHandler = require('../js/handlers').fetchBlogHandler();
const mangaHandler = require('../js/handlers').fetchMangaHandler();
const projectHandler = require('../js/handlers').fetchProjectHandler();
const writingHandler = require('../js/handlers').fetchWritingHandler();

const getAllAnime = async (req, res, next) => {
  try {
    res.locals.anime = await animeHandler.lookupAnimeShows(
      req.query.page || 1, res.locals.pageMax || 12, req.query.category || '',
    );
    res.locals.animeCount = await animeHandler.getTotalShowCount(req.query.category || '');
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get all anime :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

const getOneAnime = async (req, res, next) => {
  try {
    res.locals.anime = await animeHandler.getAnimeById(req.params.animeId);
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get single anime :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

const getAllArt = async (req, res, next) => {
  try {
    res.locals.art = await artHandler.lookupArtPieces(
      req.query.page || 1, res.locals.pageMax || 12,
    );
    res.locals.artCount = await artHandler.getTotalArtCount();
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get all art pieces :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

const getOneArt = async (req, res, next) => {
  try {
    res.locals.art = await artHandler.getArtById(req.params.artId);
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get single art piece :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    res.locals.blogs = await blogHandler.listBlogPosts(
      req.query.page || 1, res.locals.pageMax || 10,
      res.locals.visible === undefined || res.locals.visible,
    );
    res.locals.blogCount = await blogHandler.getTotalBlogCount(true);
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get all blog posts :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

const getOneBlog = async (req, res, next) => {
  try {
    res.locals.blog = await blogHandler.getBlogById(req.params.blogId);
    next();
  } catch (rejection) {
    req.log.warn(`Issue found when trying to find single blog post :: ${rejection.message}`);
    next(new errors.InternalServerError(rejection.message));
  }
};

const getAllManga = async (req, res, next) => {
  try {
    res.locals.manga = await mangaHandler.lookupMangaStories(
      req.query.page || 1, res.locals.pageMax || 12, req.query.category || '',
    );
    res.locals.mangaCount = await mangaHandler.getTotalStoryCount(req.query.category || '');
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get all manga :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

const getOneManga = async (req, res, next) => {
  try {
    res.locals.manga = await mangaHandler.getMangaById(req.params.mangaId);
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get single manga :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    res.locals.projects = await projectHandler.listProjects(
      req.query.page || 1, res.locals.pageMax || 12, res.locals.visible || true,
    );
    res.locals.projectCount = await projectHandler.getTotalProjectCount(true);
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get all projects :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

const getOneProject = async (req, res, next) => {
  try {
    res.locals.project = await projectHandler.getProjectById(req.params.projectId);
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get single project :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

const getAllStories = async (req, res, next) => {
  try {
    res.locals.stories = await writingHandler.listStories(
      req.query.page || 1, res.locals.pageMax || 12,
    );
    res.locals.storyCount = await writingHandler.getTotalStoryCount();
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get all stories :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

const getOneStory = async (req, res, next) => {
  try {
    res.locals.story = await writingHandler.getStoryById(req.params.storyId);
    res.locals.chapters = await writingHandler.listChaptersInStory(
      req.params.storyId, req.query.page || 1, res.locals.pageMax || 25,
    );
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get a single story :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

const getOneChapter = async (req, res, next) => {
  try {
    res.locals.story = await writingHandler.getStoryById(req.params.storyId);
    res.locals.chapter = await writingHandler.getChapterByStoryIdAndChapterNumber(
      req.params.storyId,
      req.params.chapterNumber,
    );
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get single chapter :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

module.exports = {
  getAllAnime,
  getOneAnime,
  getAllArt,
  getOneArt,
  getAllBlogs,
  getOneBlog,
  getAllManga,
  getOneManga,
  getAllProjects,
  getOneProject,
  getAllStories,
  getOneStory,
  getOneChapter,
};
