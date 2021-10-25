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

const blogHandlerInstance = require('../../../lib/BlogHandler').getHandler();
const renderer = require('../../../lib/renderer').nunjucksRenderer();

const getAllBlogs = async (req, res, next) => {
  try {
    const blogPosts = await blogHandlerInstance.findBlogs(
      Math.max(0, ((req.query.page || 1) - 1)) * 10,
      10,
      { 'time_posted': -1 },
    );
    const totalBlogCount = await blogHandlerInstance.getTotalBlogCount();

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
        blogs: blogPosts,
      },

      pagination: {
        base_url:  '/blog?',
        total:     totalBlogCount,
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
  } catch (e) {
    req.log.warn(`Issue found when trying to get all blog posts :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

module.exports = getAllBlogs;
