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

const writingHandler = require('../../../js/handlers').fetchWritingHandler();

const getOneStory = async (req, res, next) => {
  try {
    const story = await writingHandler.getStoryById(req.params.storyId);
    const sortedChapterList = await writingHandler.listChaptersInStory(
      req.params.storyId, req.query.page || 1, 25,
    );

    res.contentType = 'text/html';
    res.header('content-type', 'text/html');
    res.send(200, renderer.render('pages/stories/stories_one.njk', {
      top_page: {
        title:     story.title,
        tagline:   'A collection of all the things that I\'ve '
          + 'scribbled down at one point or another',
        image_src: `data:image/png;base64,${story.cover_img}`,
        image_alt: story.title,
      },

      content: {
        story,
        chapters: sortedChapterList,
      },

      pagination: {
        base_url:  `/hobbies/writing/${req.params.storyId}?`,
        total:     story.chapters.length,
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
  } catch (e) {
    req.log.warn(`Issue found when trying to get a single story :: ${e.message}`);
    next(new errors.InternalServerError(e.message));
  }
};

module.exports = getOneStory;
