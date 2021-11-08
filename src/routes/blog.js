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

const { getAllBlogs, getOneBlog } = require('./common');

const prepareBlogPage = (req, res, next) => {
  res.locals.pageMax = 12;
  res.locals.visible = true;
  next();
};

const viewAllBlogs = async (req, res, next) => {
  res.contentType = 'text/html';
  res.header('content-type', 'text/html');
  res.send(200, renderer.render('pages/blog_all.njk', {
    ...res.nunjucks,
    top_page: {
      title:     'My Blog',
      tagline:   'A list of scribbled things that have been made over the years.',
      image_src: '/assets/images/J_handle.png',
      image_alt: 'Main face of the site',
    },

    content: {
      blogs: res.locals.blogs,
    },

    pagination: {
      base_url:  '/blog?',
      total:     res.locals.blogCount,
      page:      Math.max((req.query.page || 1), 1),
      page_size: 10,
    },

    head: {
      title:        'J4Numbers :: Blog',
      description:  'Home to the wild things',
      current_page: 'blog',
    },
  }));
  next();
};

const viewOneBlog = async (req, res, next) => {
  if (res.locals.blog !== null) {
    res.contentType = 'text/html';
    res.header('content-type', 'text/html');
    res.send(200, renderer.render('pages/blog_single.njk', {
      ...res.nunjucks,

      top_page: {
        title:     res.locals.blog.long_title,
        blog_tags: res.locals.blog.tags,
        image_src: '/assets/images/J_handle.png',
        image_alt: 'Main face of the site',
      },

      content: {
        blog_text: res.locals.blog.full_text,
      },

      head: {
        title:        `J4Numbers :: ${res.locals.blog.long_title}`,
        description:  'Home to the wild things',
        current_page: 'blog',
      },
    }));
    next();
  } else {
    next(new errors.NotFoundError());
  }
};

module.exports = (server) => {
  server.get('/blog', prepareBlogPage, getAllBlogs, viewAllBlogs);
  server.get('/blog/:blogId', getOneBlog, viewOneBlog);
  return server;
};
