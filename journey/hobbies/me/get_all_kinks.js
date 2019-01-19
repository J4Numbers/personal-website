/*
 * MIT License
 *
 * Copyright (c) 2019 Matthew D. Ball
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

const kinkHandlerInstance = require('../../../lib/KinkHandler').getHandler();

const getAllKinks = (req, res, next) => {
    Promise.all(
        [
            kinkHandlerInstance.findKinks(Math.max(0, ((req.query['page'] || 1) - 1)) * 20, 20, {'kink_name': 1}, req.query['category']),
            kinkHandlerInstance.getTotalKinkCount(false)
        ]
    ).then(([kinks, totalCount]) => {
        res.render('./pages/me/me_kinks_all', {
            top_page: {
                title: 'Welcome to Me',
                tagline: 'If you were looking for a more personal overview about yours truly, you\'ve come to the right place!',
                image_src: '/images/handle_logo.png',
                image_alt: 'My logo that I use to represent myself'
            },

            content: {
                title: 'A collection of kinks belonging to me',
                kinks: kinks
            },

            pagination: {
                base_url: '/hobbies/me/fetishes?',
                total: totalCount,
                page: Math.max((req.query['page'] || 1), 1),
                page_size: 20
            },

            head: {
                title: 'M4Numbers :: Welcome to Me',
                description: 'Home to the wild things',
                current_page: 'hobbies',
                current_sub_page: 'me',
                current_sub_sub_page: 'fetishes',
                current_category: req.query['category']
            }
        });
    }, rejection => next(rejection));
};

module.exports = getAllKinks;
