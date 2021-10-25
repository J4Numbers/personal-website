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

const staticHandlerInstance = require('../../../lib/StaticHandler').getHandler();
const StaticDocumentTypes = require('../../../lib/StaticDocumentTypes');

const sitemapSorter = (a, b) => (
  // eslint-disable-next-line no-nested-ternary
  (a.page_name > b.page_name)
    ? 1
    : ((a.page_name < [ 'page_name' ]) ? -1 : 0));

const getSitemap = async (req, res, next) => {
  try {
    const sitemapItems = await staticHandlerInstance.findStatic(StaticDocumentTypes.SITEMAP);
    const sortedSiteMap = ((sitemapItems || {}).content || []).sort(sitemapSorter);
    res.contentType = 'text/html';
    res.header('content-type', 'text/html');
    res.send(200, renderer.render('pages/sitemap.njk', {
      top_page: {
        title:     'Sitemap',
        tagline:   'If you want to get somewhere, why not use the links below to navigate!',
        bs_icon:   'geo',
      },

      content: {
        title:      'Sitemap',
        site_links: sortedSiteMap || [],
      },

      head: {
        title:        'J4Numbers :: Sitemap',
        description:  'Home to the wild things',
        current_page: 'sitemap',
      },
    }));
    next();
  } catch (caught) {
    req.log.warn(`Catch during find static :: ${caught}`);
    next(new errors.InternalServerError(caught.message));
  }
};

module.exports = (server) => {
  server.get('/map', getSitemap);
};
