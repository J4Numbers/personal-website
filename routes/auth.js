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
const crypto = require("crypto");
const router = express.Router();

/* GET home page. */
router.get("/login", function (req, res, next) {
    if (req.signedCookies.logged_in) {
        res.redirect(303, "/admin");
    } else {
        res.render("./pages/login", {
            top_page: {
                title: "Log in",
                tagline: "Log into the site as an administrator",
                fa_type: "fas",
                fa_choice: "fa-key"
            },

            head: {
                title: "M4Numbers",
                description: "Home to the wild things",
                current_page: "login"
            }
        });
    }
});

router.post("/login", function (req, res, next) {
    if (req.body["admin_password"] && !req.signedCookies.logged_in) {
        let hash = crypto.createHash("sha256").update(req.body["admin_password"]).digest("hex");
        if (hash === "c4d4c7cd46704006b40586ad7b9f5cc64e519641aae57f201c2d7d119d1bf9f9") {
            res.cookie("logged_in", 1, {signed: true, maxAge: 100000});
        }
    }
    res.redirect(303, "/login");
});

router.get("/admin", function (req, res, next) {
    if (!req.signedCookies.logged_in) {
        res.redirect(303, "/login");
    } else {
        res.render("./pages/admin", {
            top_page: {
                title: "Administrator Toolkit",
                tagline: "All the functions that the administrator of the site has available to them",
                fa_type: "fas",
                fa_choice: "fa-toolbox"
            },

            head: {
                title: "M4Numbers",
                description: "Home to the wild things",
                current_page: "admin"
            }
        });
    }
})

module.exports = router;
