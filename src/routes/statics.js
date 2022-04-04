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

const envs = process.env;
const luxon = require('luxon');
const errors = require('restify-errors');

const staticHandler = require('../js/handlers').fetchStaticHandler();
const staticTypes = require('../js/objects/StaticDocumentTypes').StaticDocumentTypes;
const renderer = require('../lib/renderer').nunjucksRenderer();

const contactSorter = (a, b) => (
  // eslint-disable-next-line no-nested-ternary
  (a.contact_method > b.contact_method)
    ? 1
    : ((a.contact_method < [ 'contact_method' ]) ? -1 : 0));

const sitemapSorter = (a, b) => (
  // eslint-disable-next-line no-nested-ternary
  (a.page_name > b.page_name)
    ? 1
    : ((a.page_name < [ 'page_name' ]) ? -1 : 0));

const getAboutMe = async (req, res, next) => {
  try {
    const staticContent = await staticHandler.getStaticById(staticTypes.ABOUT_ME);
    res.contentType = 'text/html';
    res.header('content-type', 'text/html');
    res.send(200, renderer.render('pages/about.njk', {
      top_page: {
        title:     'About Me',
        tagline:   'If you were looking for a general overview about yours truly, '
          + 'you\'ve come to the right place!',
        image_src: '/assets/images/J_handle.png',
        image_alt: 'My logo that I use to represent myself',
      },

      content: {
        title: 'About Me',
        text:  (staticContent || {}).content,
      },

      head: {
        title:        'J4Numbers :: About Me',
        description:  'Home to the wild things',
        current_page: 'about',
      },
    }));
    next();
  } catch (rejection) {
    req.log.warn(`Issue found when trying to get about me page :: ${rejection.message}`);
    next(new errors.InternalServerError(rejection.message));
  }
};

const getContactMe = async (req, res, next) => {
  try {
    const staticContent = await staticHandler.getStaticById(staticTypes.CONTACT_ME);
    const sortedStaticContacts = ((staticContent || {}).content || []).sort(contactSorter);
    res.contentType = 'text/html';
    res.header('content-type', 'text/html');
    res.send(200, renderer.render('pages/contact.njk', {
      top_page: {
        title:   'Contact Me',
        tagline: 'If, for whatever reason, you want to get in touch with me, '
          + 'use the links below to find my other hidey-holes.',
        bs_icon: 'telephone-fill',
      },

      content: {
        options: sortedStaticContacts || [],
      },

      head: {
        title:        'J4Numbers :: Contact Me',
        description:  'Home to the wild things',
        current_page: 'contact',
      },
    }));
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to get contact me page :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

const getSitemap = async (req, res, next) => {
  try {
    const sitemapItems = await staticHandler.getStaticById(staticTypes.SITEMAP);
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

const getStatistics = async (req, res, next) => {
  res.contentType = 'text/html';
  res.header('content-type', 'text/html');
  res.send(200, renderer.render('pages/stats.njk', {
    top_page: {
      title:     'Statistics',
      tagline:   'Some statistics that relate directly to the site',
      bs_icon:   'clipboard-check',
    },

    content: {
      time:    Date.now(),
      version: envs.NPM_PACKAGE_VERSION,
    },

    head: {
      title:        'J4Numbers :: Statistics',
      description:  'Home to the wild things',
      current_page: 'stats',
    },
  }));
  next();
};

module.exports = (server) => {
  server.get('/about', getAboutMe);
  server.get('/contact', getContactMe);
  server.get('/map', getSitemap);
  server.get('/stats', getStatistics);
};
