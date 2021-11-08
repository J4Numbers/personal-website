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

const { getAllArt, getOneArt } = require('../common');

const renderer = require('../../../lib/renderer').nunjucksRenderer();

const prepareArtList = (req, res, next) => {
  res.locals.pageMax = 12;
  next();
};

const viewAllArt = async (req, res, next) => {
  try {
    let baseUrl = '';
    if (req.query.q) {
      baseUrl += `q=${req.query.q}&`;
    }
    res.contentType = 'text/html';
    res.header('content-type', 'text/html');
    res.send(200, renderer.render('pages/art/art_all.njk', {
      top_page: {
        title:     'My Art Scrapbook',
        tagline:   'A collection of the things that I have attempted to '
          + 'draw at some point or another',
        image_src: '/assets/images/J_handle.png',
        image_alt: 'Main face of the site',
      },

      content: {
        pictures: res.locals.art,
      },

      pagination: {
        base_url:  `/hobbies/art?${baseUrl}`,
        total:     res.locals.artCount,
        page:      Math.max((req.query.page || 1), 1),
        page_size: 12,
      },

      head: {
        title:            'J4Numbers :: Hobbies :: Art',
        description:      'Home to the wild things',
        current_page:     'hobbies',
        current_sub_page: 'art',
      },
    }));
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get all art pieces :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

const viewOneArt = async (req, res, next) => {
  res.contentType = 'text/html';
  res.header('content-type', 'text/html');
  res.send(200, renderer.render('pages/art/art_one.njk', {
    top_page: {
      title:     res.locals.art.title,
      tagline:   'A collection of the things that I have attempted to'
        + ' draw at some point or another',
      image_src: `data:image/png;base64,${res.locals.art.image.thumb}`,
      image_alt: res.locals.art.title,
    },

    content: {
      picture: res.locals.art,
    },

    head: {
      title:            'J4Numbers :: Hobbies :: Art :: ',
      description:      'Home to the wild things',
      current_page:     'hobbies',
      current_sub_page: 'art',
    },
  }));
  next();
};

module.exports = (server) => {
  server.get('/hobbies/art', prepareArtList, getAllArt, viewAllArt);
  server.get('/hobbies/art/:artId', getOneArt, viewOneArt);
};
