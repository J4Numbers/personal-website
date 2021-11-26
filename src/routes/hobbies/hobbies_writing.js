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

const { getAllStories, getOneStory, getOneChapter } = require('../common');

const renderer = require('../../lib/renderer').nunjucksRenderer();

const prepareStoryList = (req, res, next) => {
  res.locals.pageMax = 12;
  next();
};

const prepareChapterList = (req, res, next) => {
  res.locals.pageMax = 25;
  next();
};

const viewAllStories = async (req, res, next) => {
  let baseUrl = '';
  if (req.query.q) {
    baseUrl += `q=${req.query.q}&`;
  }
  res.contentType = 'text/html';
  res.header('content-type', 'text/html');
  res.send(200, renderer.render('pages/stories/stories_all.njk', {
    top_page: {
      title:     'My Writings',
      tagline:   'A collection of all the things that I\'ve '
        + 'scribbled down at one point or another',
      image_src: '/assets/images/J_handle.png',
      image_alt: 'Main face of the site',
    },

    content: {
      stories: res.locals.stories,
    },

    pagination: {
      base_url:  `/hobbies/writing?${baseUrl}`,
      total:     res.locals.storyCount,
      page:      Math.max((req.query.page || 1), 1),
      page_size: 12,
    },

    head: {
      title:            'J4Numbers :: Hobbies :: Writing',
      description:      'Home to the wild things',
      current_page:     'hobbies',
      current_sub_page: 'writing',
    },
  }));
  next();
};

const viewOneStory = async (req, res, next) => {
  res.contentType = 'text/html';
  res.header('content-type', 'text/html');
  res.send(200, renderer.render('pages/stories/stories_one.njk', {
    top_page: {
      title:     res.locals.story.title,
      tagline:   'A collection of all the things that I\'ve '
        + 'scribbled down at one point or another',
      image_src: `data:image/png;base64,${res.locals.story.cover_img}`,
      image_alt: res.locals.story.title,
    },

    content: {
      story:    res.locals.story,
      chapters: res.locals.chapters,
    },

    pagination: {
      base_url:  `/hobbies/writing/${req.params.storyId}?`,
      total:     res.locals.story.chapters.length,
      page:      Math.max((req.query.page || 1), 1),
      page_size: 25,
    },

    head: {
      title:            'J4Numbers :: Hobbies :: Writing :: ',
      description:      'Home to the wild things',
      current_page:     'hobbies',
      current_sub_page: 'writing',
    },
  }));
  next();
};

const viewOneChapter = async (req, res, next) => {
  res.contentType = 'text/html';
  res.header('content-type', 'text/html');
  res.send(200, renderer.render('pages/stories/chapters_one.njk', {
    top_page: {
      title:     res.locals.story.title,
      tagline:   res.locals.chapter.chapter_title,
      image_src: `data:image/png;base64,${res.locals.story.cover_img}`,
      image_alt: res.locals.story.title,
    },

    content: {
      story:   res.locals.story,
      chapter: res.locals.chapter,
    },

    head: {
      title:            'J4Numbers :: Hobbies :: Writing :: ',
      description:      'Home to the wild things',
      current_page:     'hobbies',
      current_sub_page: 'writing',
    },
  }));
  next();
};

module.exports = (server) => {
  server.get('/hobbies/writing', prepareStoryList, getAllStories, viewAllStories);
  server.get('/hobbies/writing/:storyId', prepareChapterList, getOneStory, viewOneStory);
  server.get('/hobbies/writing/:storyId/chapter/:chapterNumber', getOneChapter, viewOneChapter);
};
