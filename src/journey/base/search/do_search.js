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

const renderer = require('../../../lib/renderer').nunjucksRenderer();

const animeHandler = require('../../../js/handlers').fetchAnimeHandler();
const artHandler = require('../../../lib/ArtHandler').getHandler();
const blogHandler = require('../../../lib/BlogHandler').getHandler();
const mangaHandler = require('../../../lib/MangaHandler').getHandler();
const storyHandler = require('../../../lib/StoryHandler').getHandler();

// TODO: Fix
const doSearch = async (req, res, next) => {
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
  };
  try {
    const tagList = renderVars.search.split(/, */u);

    const query = {
      tags: {
        $all: tagList,
      },
    };

    Promise.all([
      animeHandler.lookupAnimeTitle(renderVars.search, tagList),
      artHandler.findArtPiecesByQuery({
        $or: [ query, {
          'title': {
            $regex:   renderVars.search,
            $options: 'i',
          },
        } ],
      }, 0, 10, { 'title': -1 }),
      blogHandler.findBlogsByQuery({
        $or: [ query, {
          'long_title': {
            $regex:   renderVars.search,
            $options: 'i',
          },
        } ],
      }, 0, 10, { 'long_title': -1 }),
      mangaHandler.findMangaBooksByQuery({
        $or: [ query, {
          'title.romaji': {
            $regex:   renderVars.search,
            $options: 'i',
          },
        } ],
      }, 0, 10, { 'title.romaji': -1 }),
      storyHandler.findStoriesByQuery({
        $or: [ query, {
          'title': {
            $regex:   renderVars.search,
            $options: 'i',
          },
        } ],
      }, 0, 10, { 'title': -1 }),
    ])
      .then(async ([ animeItems, artItems, blogItems, mangaItems, storyItems ]) => {
        if (!res.nunjucks.friendly) {
          req.log.debug('Not signed in... filtering unprotected items');
          blogItems = blogItems.filter((item) => item.public);
        }
        return [ animeItems, artItems, blogItems, mangaItems, storyItems ];
      })
      .then(([ animeItems, artItems, blogItems, mangaItems, storyItems ]) => {
        renderVars.content = {
          'anime':   animeItems,
          'art':     artItems,
          'blogs':   blogItems,
          'manga':   mangaItems,
          'stories': storyItems,
        };
        return Promise.resolve();
      })
      .then(() => {
        res.send(200, renderer.render('pages/search.njk', renderVars));
        next();
      });
  } catch (e) {
    req.log.warn('Error when trying to search items');
    req.log.warn(e.message);
    renderVars.error = e;
    res.send(200, renderer.render('pages/search.njk', renderVars));
    next();
  }
};

module.exports = (server) => {
  server.get('/search', doSearch);
};
