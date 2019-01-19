/*
 * MIT License
 *
 * Copyright (c) 2018 Matthew D. Ball
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const express = require('express');
const router = express.Router();
const markdown = require('markdown-it')();
const SiteError = require('../../lib/SiteError');
const BlogHandler = require('../../lib/BlogHandler');
const blogHandlerInstance = BlogHandler.getHandler();

/* GET all blog posts */
router.get('/', function (req, res, next) {
    Promise.all(
        [
            blogHandlerInstance.findBlogs(Math.max(0, ((req.query['page'] || 1) - 1)) * 10, 10, {'time_posted': -1}, false),
            blogHandlerInstance.getTotalBlogCount()
        ]
    ).then(([blogs, totalCount]) => {
        res.render('./pages/me/me_blog_all', {
            top_page: {
                title: 'My Private Blog',
                tagline: 'A list of scribbled things that have been made over the years.',
                image_src: '/images/handle_logo.png',
                image_alt: 'Main face of the site'
            },

            content: {
                blogs: blogs
            },

            pagination: {
                base_url: '/hobbies/me/extended-blog?',
                total: totalCount,
                page: Math.max((req.query['page'] || 1), 1),
                page_size: 10
            },

            head: {
                title: 'M4Numbers :: Extended Blog',
                description: 'Home to the wild things',
                current_page: 'hobbies',
                current_sub_page: 'me',
                current_sub_sub_page: 'extended-blog'
            }
        });
    }, rejection => {
        next(rejection);
    });
});

/* GET single blog post page. */
router.get('/:blogId', function (req, res, next) {
    blogHandlerInstance.findBlog(req.params['blogId'])
        .then(blogPost => {
            if (blogPost !== null) {
                res.render('./pages/me/me_blog_single', {
                    top_page: {
                        title: blogPost.long_title,
                        blog_tags: blogPost.tags,
                        image_src: '/images/handle_logo.png',
                        image_alt: 'Main face of the site',
                    },

                    content: {
                        blog_text: markdown.render(blogPost.full_text)
                    },

                    head: {
                        title: `M4Numbers :: ${blogPost.long_title}`,
                        description: 'Home to the wild things',
                        current_page: 'hobbies',
                        current_sub_page: 'me',
                        current_sub_sub_page: 'extended-blog'
                    }
                });
            } else {
                next(new SiteError(404, 'Not Found'));
            }
        }, rejection => {
            next(rejection);
        });
});

module.exports = router;
