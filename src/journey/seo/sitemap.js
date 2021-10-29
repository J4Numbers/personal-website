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

const config = require('config');
const errors = require('restify-errors');

const staticHandler = require('../../js/handlers').fetchStaticHandler();
const staticTypes = require('../../js/objects/StaticDocumentTypes').StaticDocumentTypes;

const sitemapSorter = (a, b) => (
  // eslint-disable-next-line no-nested-ternary
  (a.page_name > b.page_name)
    ? 1
    : ((a.page_name < [ 'page_name' ]) ? -1 : 0));

const displaySitemap = async (req, res, next) => {
  try {
    const baseLink = `${
      config.get('app.http2.enabled') ? 'https' : 'http'
    }://${config.get('app.hostname')}:${config.get('app.port')}`;

    const sitemapItems = await staticHandler.getStaticById(staticTypes.SITEMAP);
    const sortedSiteMap = ((sitemapItems || {}).content || []).sort(sitemapSorter);
    const sitemapText = sortedSiteMap.reduce(
      (ongoing, current) => `${ongoing}${baseLink}${current.page_link}\n`,
      '',
    );

    res.contentType = 'text/plain';
    res.header('content-type', 'text/plain');
    res.send(200, sitemapText);
    next();
  } catch (caught) {
    req.log.warn(`Catch during find static :: ${caught}`);
    next(new errors.InternalServerError(caught.message));
  }
};

module.exports = displaySitemap;
