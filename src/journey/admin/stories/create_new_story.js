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

const fs = require('fs');
const sharp = require('sharp');

const writingHandler = require('../../../js/handlers').fetchWritingHandler();

const createNewStory = async (req, res, next) => {
  try {
    const submission = {
      title: req.body[ 'story-title' ],
      story_status: req.body[ 'story-status' ],
      story_type: req.body[ 'story-type' ],
      synopsis: req.body[ 'story-synopsis' ],
      meta_review: req.body[ 'story-notes' ],
      tags: req.body[ 'story-tags' ]
        .split(/, ?/u)
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
    };
    if (typeof req.files[ 'story-image' ] !== 'undefined' && req.files[ 'story-image' ].size > 0) {
      req.log.info(`Reading in new image from ${req.files[ 'story-image' ].path}`);
      const thumbPromise = await sharp(fs.readFileSync(req.files[ 'story-image' ].path))
        .resize({ width: 200 })
        .toBuffer();
      submission.cover_img = thumbPromise.toString('base64');
    }
    const savedStory = await writingHandler.submitStory(submission);
    res.redirect(303, `/admin/stories/${savedStory._id}`, next);
  } catch (e) {
    req.log.warn(`Issue found when creating new story :: ${e.message}`);
    res.redirect(303, '/admin/stories/new', next);
  }
};

module.exports = createNewStory;
