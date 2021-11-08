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

const viewAllProjects = require('../../journey/admin/projects/view_all_projects');
const createNewProject = require('../../journey/admin/projects/view_create_new_project');
const postNewProject = require('../../journey/admin/projects/create_new_project');
const getOneProject = require('../../journey/admin/projects/view_single_project');
const editOneProject = require('../../journey/admin/projects/view_edit_single_project');
const postProjectEdits = require('../../journey/admin/projects/edit_single_project');
const viewDeleteProject = require('../../journey/admin/projects/view_delete_one_project');
const deleteSingleProject = require('../../journey/admin/projects/delete_single_project');

module.exports = (server) => {
  server.get('/admin/projects', testAdministratorNotLoggedIn, viewAllProjects);
  server.get('/admin/projects/new', testAdministratorNotLoggedIn, createNewProject);
  server.post('/admin/projects/new', testAdministratorNotLoggedIn, postNewProject);
  server.get('/admin/projects/:projectId', testAdministratorNotLoggedIn, getOneProject);
  server.get('/admin/projects/:projectId/edit', testAdministratorNotLoggedIn, editOneProject);
  server.post('/admin/projects/:projectId/edit', testAdministratorNotLoggedIn, postProjectEdits);
  server.get('/admin/projects/:projectId/delete', testAdministratorNotLoggedIn, viewDeleteProject);
  server.post(
    '/admin/projects/:projectId/delete', testAdministratorNotLoggedIn, deleteSingleProject,
  );
};
