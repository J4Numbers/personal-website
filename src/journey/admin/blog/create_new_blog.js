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

const blogHandler = require('../../../js/handlers').fetchBlogHandler();

const postNewBlog = async (req, res, next) => {
  try {
    const savedBlog = await blogHandler.submitBlog({
      long_title: req.body[ 'blog-title' ],
      short_title: req.body[ 'blog-title' ]
        .replace(/ /gu, '-')
        .replace(/\p{Z}/gu, '')
        .toLocaleLowerCase(),
      full_text: req.body[ 'blog-text' ],
      public: req.body[ 'blog-visible' ] === 'Y',
      tags: req.body[ 'blog-tags' ]
        .split(/, ?/u)
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
      time_posted: new Date(),
    });
    res.redirect(303, `/admin/blog/${savedBlog._id}`, next);
    next();
  } catch (e) {
    req.log.warn(`Issue found when trying to create new blog :: ${e.message}`);
    res.redirect(303, '/admin/blog/new', next);
  }
};

module.exports = postNewBlog;
