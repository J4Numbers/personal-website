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

const { getAllAnime, getOneAnime } = require('../common');

const renderer = require('../../lib/renderer').nunjucksRenderer();

const prepareAnimeList = (req, res, next) => {
  res.locals.pageMax = 12;
  next();
};

const viewAllAnime = async (req, res, next) => {
  let baseUrl = '';
  if (req.query.category) {
    baseUrl += `category=${req.query.category}&`;
  }
  if (req.query.q) {
    baseUrl += `q=${req.query.q}&`;
  }
  res.contentType = 'text/html';
  res.header('content-type', 'text/html');
  res.send(200, renderer.render('pages/anime/anime_all.njk', {
    top_page: {
      title:     'My Anime Watchlist',
      tagline:   'A list of all the strange things that I have seen at some point or another',
      image_src: '/assets/images/J_handle.png',
      image_alt: 'Main face of the site',
    },

    content: {
      shows: res.locals.anime,
    },

    pagination: {
      base_url:  `/hobbies/anime?${baseUrl}`,
      total:     res.locals.animeCount,
      page:      Math.max((req.query.page || 1), 1),
      page_size: 12,
    },

    head: {
      title:            'J4Numbers :: Hobbies :: Anime',
      description:      'Home to the wild things',
      current_page:     'hobbies',
      current_sub_page: 'anime',
      current_category: req.query.category || 'all',
    },
  }));
  next();
};

const viewOneAnime = async (req, res, next) => {
  res.contentType = 'text/html';
  res.header('content-type', 'text/html');
  res.send(200, renderer.render('pages/anime/anime_one.njk', {
    top_page: {
      title:     res.locals.anime.title.romaji,
      tagline:   'A list of all the strange things that I have seen at some point or another',
      image_src: res.locals.anime.cover_img.large,
      image_alt: res.locals.anime.title.romaji,
    },

    content: {
      show:     res.locals.anime,
      comments: res.locals.anime.review,
    },

    head: {
      title:            'J4Numbers :: Hobbies :: Anime :: ',
      description:      'Home to the wild things',
      current_page:     'hobbies',
      current_sub_page: 'anime',
    },
  }));
  next();
};

module.exports = (server) => {
  server.get('/hobbies/anime', prepareAnimeList, getAllAnime, viewAllAnime);
  server.get('/hobbies/anime/:animeId', getOneAnime, viewOneAnime);
};
