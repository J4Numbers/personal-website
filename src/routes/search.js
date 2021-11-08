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

const errors = require('restify-errors');

const renderer = require('../../../lib/renderer').nunjucksRenderer();

const animeHandler = require('../../../js/handlers').fetchAnimeHandler();
const artHandler = require('../../../js/handlers').fetchArtHandler();
const blogHandler = require('../../../js/handlers').fetchBlogHandler();
const mangaHandler = require('../../../js/handlers').fetchMangaHandler();
const writingHandler = require('../../../js/handlers').fetchWritingHandler();

const loadResults = (req, res, next) => {
  res.locals.searchResults = {};
  next();
};

const resolveAnimeItems = async (req, res, next) => {
  try {
    const tagList = req.query.q.split(/, */u);
    res.locals.searchResults.anime = await animeHandler.lookupAnimeTitle(req.query.q, tagList);
    next();
  } catch (e) {
    req.log.warn('Error when trying to search anime items');
    req.log.warn(e.message);
    next(new errors.InternalServerError(e));
  }
};

const resolveArtItems = async (req, res, next) => {
  try {
    const tagList = req.query.q.split(/, */u);
    res.locals.searchResults.art = await artHandler.lookupArtTitles(req.query.q, tagList);
    next();
  } catch (e) {
    req.log.warn('Error when trying to search art items');
    req.log.warn(e.message);
    next(new errors.InternalServerError(e));
  }
};

const resolveBlogItems = async (req, res, next) => {
  try {
    const tagList = req.query.q.split(/, */u);
    const blogs = await blogHandler.lookupBlogs(req.query.q, tagList);
    res.locals.searchResults.blogs = (res.nunjucks.friendly)
      ? blogs
      : blogs.filter((item) => item.public);
    next();
  } catch (e) {
    req.log.warn('Error when trying to search manga items');
    req.log.warn(e.message);
    next(new errors.InternalServerError(e));
  }
};

const resolveMangaItems = async (req, res, next) => {
  try {
    const tagList = req.query.q.split(/, */u);
    res.locals.searchResults.manga = await mangaHandler.lookupMangaTitle(req.query.q, tagList);
    next();
  } catch (e) {
    req.log.warn('Error when trying to search manga items');
    req.log.warn(e.message);
    next(new errors.InternalServerError(e));
  }
};

const resolveStoryItems = async (req, res, next) => {
  try {
    const tagList = req.query.q.split(/, */u);
    res.locals.searchResults.stories = await writingHandler.lookupStories(req.query.q, tagList);
    next();
  } catch (e) {
    req.log.warn('Error when trying to search story items');
    req.log.warn(e.message);
    next(new errors.InternalServerError(e));
  }
};

const viewSearchResults = async (req, res, next) => {
  const renderVars = {
    top_page: {
      title:     'Search',
      tagline:   'Search through all the items that are on offer',
      bs_icon:   'search',
    },

    pagination: {
      base_url:  `/search?q=${req.query.q}&`,
      page:      Math.max((req.query.page || 1), 1),
      page_size: 12,
    },

    head: {
      title:            'J4Numbers :: Search',
      description:      'Home to the wild things',
      current_page:     'search',
      current_category: req.query.category || 'all',
    },

    translators: {
      anilist: (item) => item.title.romaji,
      blogs:   (item) => item.long_title,
      title:   (item) => item.title,
    },

    search: req.query.q,
    content: res.locals.searchResults,
  };
  res.send(200, renderer.render('pages/search.njk', renderVars));
  next();
};

module.exports = (server) => {
  server.get(
    '/search',
    loadResults, resolveAnimeItems, resolveArtItems, resolveBlogItems,
    resolveMangaItems, resolveStoryItems, viewSearchResults,
  );
};
