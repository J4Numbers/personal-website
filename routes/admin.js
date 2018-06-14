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

const express = require("express");
const router = express.Router();

const markdown = require("markdown-it")();
const MongoDbHandler = require("../lib/MongoDbHandler");
const mongoInstance = MongoDbHandler.getMongo();

router.get("/", function (req, res, next) {
    if (!req.signedCookies.logged_in) {
        res.redirect(303, "/login");
    } else {
        res.redirect(303, "/admin/blog");
    }
});

router.get("/blog", function (req, res, next) {
    if (!req.signedCookies.logged_in) {
        res.redirect(303, "/login");
    } else {
        Promise.all(
            [
                mongoInstance.findBlogs(Math.max(0, ((req.query["page"] || 1) - 1)) * 10, 10, {"time_posted": -1}, false),
                mongoInstance.getTotalBlogCount(false)
            ]
        ).then(([blogs, totalCount]) => {
            res.render("./pages/admin_blog_view", {
                top_page: {
                    title: "Administrator Toolkit",
                    tagline: "All the functions that the administrator of the site has available to them",
                    fa_type: "fas",
                    fa_choice: "fa-toolbox"
                },

                content: {
                    blogs: blogs
                },

                pagination: {
                    base: "/admin/blog",
                    total: totalCount,
                    page: Math.max((req.query["page"] || 1), 1),
                },

                head: {
                    title: "M4Numbers",
                    description: "Home to the wild things",
                    current_page: "admin",
                    current_sub_page: "blog-view"
                }
            });
        });
    }
});

router.get("/blog/:blogId", function (req, res, next) {
    if (!req.signedCookies.logged_in) {
        res.redirect(303, "/login");
    } else {
        mongoInstance.findBlog(req.params["blogId"]).then((blog) => {
            res.render("./pages/admin_blog_view_single", {
                top_page: {
                    title: "Administrator Toolkit",
                    tagline: "All the functions that the administrator of the site has available to them",
                    fa_type: "fas",
                    fa_choice: "fa-toolbox"
                },

                content: {
                    blog: blog,
                    blog_text: markdown.render(blog.full_text)
                },

                head: {
                    title: "M4Numbers",
                    description: "Home to the wild things",
                    current_page: "admin",
                    current_sub_page: "blog-view"
                }
            });
        });
    }
});

router.get("/blog/:blogId/edit", function (req, res, next) {
    if (!req.signedCookies.logged_in) {
        res.redirect(303, "/login");
    } else {
        mongoInstance.findBlog(req.params["blogId"]).then((blog) => {
            res.render("./pages/admin_blog_edit_single", {
                top_page: {
                    title: "Administrator Toolkit",
                    tagline: "All the functions that the administrator of the site has available to them",
                    fa_type: "fas",
                    fa_choice: "fa-toolbox"
                },

                content: {
                    blog: blog
                },

                head: {
                    title: "M4Numbers",
                    description: "Home to the wild things",
                    current_page: "admin",
                    current_sub_page: "blog-edit"
                }
            });
        });
    }
});

router.post("/blog/:blogId/edit", function (req, res, next) {
    if (!req.signedCookies.logged_in) {
        res.redirect(303, "/login");
    } else {
        mongoInstance.editBlog(
            req.params["blogId"], req.body["blog-title"],
            req.body["blog-text"], req.body["blog-visible"] === "Y",
            req.body["blog-tags"]
        ).then(() => {
            res.redirect(302, `/admin/blog/${req.params["blogId"]}`);
        }, rejection => {
            res.cookie("blog-update-error", {blog_id: req.params["blogId"], error: rejection}, {signed: true, maxAge: 1000});
            res.redirect(302, `/admin/blog/${req.params["blogId"]}`);
        });
    }
});

router.get("/blog/:blogId/delete", function (req, res, next) {
    if (!req.signedCookies.logged_in) {
        res.redirect(303, "/login");
    } else {
        mongoInstance.findBlog(req.params["blogId"]).then((blog) => {
            res.render("./pages/admin_blog_delete_single", {
                top_page: {
                    title: "Administrator Toolkit",
                    tagline: "All the functions that the administrator of the site has available to them",
                    fa_type: "fas",
                    fa_choice: "fa-toolbox"
                },

                content: {
                    blog: blog
                },

                head: {
                    title: "M4Numbers",
                    description: "Home to the wild things",
                    current_page: "admin",
                    current_sub_page: "blog-delete"
                }
            });
        });
    }
});

router.post("/blog/:blogId/delete", function (req, res, next) {
    if (!req.signedCookies.logged_in) {
        res.redirect(303, "/login");
    } else {
        mongoInstance.deleteBlog(req.params["blogId"]).then(() => {
            res.redirect(302, "/admin/blog/");
        }, rejection => {
            res.cookie("blog-delete-error", {blog_id: req.params["blogId"], error: rejection}, {signed: true, maxAge: 1000});
            res.redirect(302, `/admin/blog/${req.params["blogId"]}`);
        });
    }
});

module.exports = router;
