/*
 * MIT License
 *
 * Copyright (c) 2019 Jayne Doe
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

const errors = require('restify-errors');

const renderer = require('../../../lib/renderer').nunjucksRenderer();
const kinkHandlerInstance = require('../../../lib/KinkHandler').getHandler();

const getSingleKink = async (req, res, next) => {
    try {
        const foundKink = await kinkHandlerInstance.findKinkByRawId(req.params['kinkId']);
        res.contentType = 'text/html';
        res.header('content-type', 'text/html');
        res.send(200, renderer.render('pages/me/me_kinks_single.njk', {
            top_page: {
                title: foundKink['kink_name'],
                tagline: 'If you were looking for a more personal overview about yours truly, you\'ve come to the right place!',
                image_src: '/assets/images/J_handle.png',
                image_alt: 'My logo that I use to represent myself'
            },

            content: {
                kink: foundKink
            },

            head: {
                title: 'J4Numbers :: Welcome to Me',
                description: 'Home to the wild things',
                current_page: 'hobbies',
                current_sub_page: 'me',
                current_sub_sub_page: 'fetishes'
            }
        }));
        next();
    } catch (e) {
        next(new errors.InternalServerError(e.message));
    }
};

module.exports = getSingleKink;
