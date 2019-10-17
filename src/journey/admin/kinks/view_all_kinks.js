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

const KinkHandler = require('../../../lib/KinkHandler');
const kinkHandlerInstance = KinkHandler.getHandler();

const viewAllKinks = async (req, res, next) => {
  try {
    const kinks = await kinkHandlerInstance.findKinks(
      Math.max(0, ((req.query.page || 1) - 1)) * 20,
      20,
      { 'time_posted': -1 },
      false
    );
    const totalCount = await kinkHandlerInstance.getTotalKinkCount(false);
    res.contentType = 'text/html';
    res.header('content-type', 'text/html');
    res.send(200, renderer.render('pages/admin/kinks/admin_kink_view.njk', {
      top_page: {
        title:     'Administrator Toolkit',
        tagline:   'All the functions that the administrator of the site has available to them',
        fa_type:   'fas',
        fa_choice: 'fa-toolbox',
      },

      content: {
        kinks,
      },

      pagination: {
        base_url:  '/admin/fetishes?',
        total:     totalCount,
        page:      Math.max((req.query.page || 1), 1),
        page_size: 20,
      },

      head: {
        title:            'J4Numbers',
        description:      'Home to the wild things',
        current_page:     'admin',
        current_sub_page: 'kink-view',
      },
    }));
    next();
  } catch (e) {
    req.log.warn(`Issue found when getting all kinks :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

module.exports = viewAllKinks;