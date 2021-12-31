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

const viewAllArtPieces = require('../../journey/admin/art/get_all_art_pieces');
const viewCreateNewArtPiece = require('../../journey/admin/art/view_create_new_art_piece');
const postNewArtPiece = require('../../journey/admin/art/create_new_art_piece');
const viewArtPiece = require('../../journey/admin/art/view_one_art_piece');
const viewEditArtPiece = require('../../journey/admin/art/view_edit_single_art_piece');
const submitEditedArtPiece = require('../../journey/admin/art/edit_art_piece');
const viewDeleteArtPiece = require('../../journey/admin/art/view_delete_art_piece');
const deleteArtPiece = require('../../journey/admin/art/delete_art_piece');

module.exports = (server) => {
  server.get('/admin/art', testAdministratorNotLoggedIn, viewAllArtPieces);
  server.get('/admin/art/new', testAdministratorNotLoggedIn, viewCreateNewArtPiece);
  server.post('/admin/art/new', testAdministratorNotLoggedIn, postNewArtPiece);
  server.get('/admin/art/:artId', testAdministratorNotLoggedIn, viewArtPiece);
  server.get('/admin/art/:artId/edit', testAdministratorNotLoggedIn, viewEditArtPiece);
  server.post('/admin/art/:artId/edit', testAdministratorNotLoggedIn, submitEditedArtPiece);
  server.get('/admin/art/:artId/delete', testAdministratorNotLoggedIn, viewDeleteArtPiece);
  server.post('/admin/art/:artId/delete', testAdministratorNotLoggedIn, deleteArtPiece);
};
