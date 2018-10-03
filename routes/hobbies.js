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

const me = require("./me");
const meAuth = require("./me/me_auth");
const art = require("./hobbies/hobbies_art");
const writing = require("./hobbies/hobbies_writing");
const anime = require("./hobbies/hobbies_anime");
const manga = require("./hobbies/hobbies_manga");

router.get("/", function (req, res, next) {
    res.render("./pages/hobbies_all", {
        top_page: {
            title: "My Hobbies",
            tagline: "I have several hobbies and interests... Some of them are somewhat worrying",
            image_src: "/images/handle_logo.png",
            image_alt: "Main face of the site"
        },

        head: {
            title: "M4Numbers :: Hobbies",
            description: "Home to the wild things",
            current_page: "hobbies",
            current_sub_page: "index"
        }
    });
});

router.use("/me", [meAuth, me]);
router.use("/writing", [writing]);
router.use("/art", [art]);
router.use("/anime", [anime]);
router.use("/manga", [manga]);

module.exports = router;
