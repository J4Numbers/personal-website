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

const config = require('config');

const adminAuthHandler = require('../../js/auth').fetchAdminAuthHandler();
const tokenHandler = require('../../js/handlers').fetchTokenHandler();

const adminLoginCompare = async (req, res, next) => {
  if (req.body.admin_password && !(res.nunjucks.logged_in)) {
    const ident = adminAuthHandler.attemptAuthentication({ password: req.body.admin_password });
    if (ident.success) {
      res.header(
        'Set-Cookie',
        `login-token=${await tokenHandler.generateSignature({ admin: true })}; `
          + 'Max-Age=3600; '
          + `Domain=${config.get('app.hostname')}; `
          + 'Secure; '
          + 'HttpOnly; '
          + 'SameSite=Strict',
      );
    }
  }
  res.redirect(303, '/admin/login', next);
};

module.exports = adminLoginCompare;
