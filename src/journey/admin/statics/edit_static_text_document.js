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

const staticHandler = require('../../../js/handlers').fetchStaticHandler();

const editTextDocument = async (req, res, next) => {
  try {
    await staticHandler.submitStatic({
      _id: res.locals.staticId,
      content: req.body[ 'document-text' ],
    });
    res.redirect(303, `/admin/statics/${res.locals.staticId}`, next);
  } catch (e) {
    req.log
      .warn(`Issue found trying to edit static document ${res.locals.staticId} :: ${e.message}`);
    res.redirect(303, `/admin/statics/${res.locals.staticId}`, next);
  }
};

module.exports = editTextDocument;
