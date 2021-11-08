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

const { getAllProjects, getOneProject } = require('./common');

const prepareProjectPage = (req, res, next) => {
  res.locals.pageMax = 12;
  res.locals.visible = true;
  next();
};

const viewAllProjects = async (req, res, next) => {
  res.contentType = 'text/html';
  res.header('content-type', 'text/html');
  res.send(200, renderer.render('pages/project_all.njk', {
    top_page: {
      title:     'My Projects',
      tagline:   'A list of things that I have made in my spare time at some point or another.',
      image_src: '/assets/images/J_handle.png',
      image_alt: 'Main face of the site',
    },

    content: {
      projects: res.locals.projects,
    },

    pagination: {
      base_url:  '/projects?',
      total:     res.locals.projectCount,
      page:      Math.max((req.query.page || 1), 1),
      page_size: 10,
    },

    head: {
      title:        'J4Numbers :: Projects',
      description:  'Home to the wild things',
      current_page: 'projects',
    },
  }));
  next();
};

const viewOneProject = async (req, res, next) => {
  if (res.locals.project !== null) {
    res.contentType = 'text/html';
    res.header('content-type', 'text/html');
    res.send(200, renderer.render('pages/project_single.njk', {
      top_page: {
        title:        res.locals.project.long_title,
        project_tags: res.locals.project.tags,
        image_src:    '/assets/images/J_handle.png',
        image_alt:    'Main face of the site',
      },

      content: {
        project_text: res.locals.project.description,
      },

      head: {
        title:        `J4Numbers :: ${res.locals.project.long_title}`,
        description:  'Home to the wild things',
        current_page: 'projects',
      },
    }));
    next();
  } else {
    next(new errors.NotFoundError());
  }
};

module.exports = (server) => {
  server.get('/projects', prepareProjectPage, getAllProjects, viewAllProjects);
  server.get('/projects/:projectId', getOneProject, viewOneProject);
};
