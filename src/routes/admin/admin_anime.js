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

const { testAdministratorNotLoggedIn } = require('./common');

const adminViewAllAnime = require('../../journey/admin/anime/get_all_anime');
const adminViewOneAnime = require('../../journey/admin/anime/get_one_anime');
const adminViewEditOneAnime = require('../../journey/admin/anime/get_edit_anime');
const adminEditOneAnime = require('../../journey/admin/anime/post_edit_anime');
const adminRefreshAnimeList = require('../../journey/admin/anime/refresh_anime');

module.exports = (server) => {
  server.get('/admin/anime', testAdministratorNotLoggedIn, adminViewAllAnime);
  server.get('/admin/anime/:animeId', testAdministratorNotLoggedIn, adminViewOneAnime);
  server.get('/admin/anime/:animeId/edit', testAdministratorNotLoggedIn, adminViewEditOneAnime);
  server.post('/admin/anime/:animeId/edit', testAdministratorNotLoggedIn, adminEditOneAnime);
  server.post('/admin/anime/refresh', testAdministratorNotLoggedIn, adminRefreshAnimeList);
};
