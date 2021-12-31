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

const artHandler = require('../../../js/handlers').fetchArtHandler();

const postNewArtPiece = async (req, res, next) => {
  try {
    req.log.info(`Reading in new image from ${req.files[ 'art-image' ].path}`);
    const thumbPromise = await sharp(fs.readFileSync(req.files[ 'art-image' ].path))
      .resize({ width: 200 })
      .toBuffer();
    const thumbImage = thumbPromise.toString('base64');
    const imageAsBase64 = fs.readFileSync(req.files[ 'art-image' ].path, 'base64');
    const savedArt = await artHandler.submitArt({
      title: req.body[ 'art-title' ],
      date_completed: req.body[ 'art-completed-date' ],
      image: {
        thumb: thumbImage,
        full_size: imageAsBase64,
      },
      notes: req.body[ 'art-notes' ],
      tags: req.body[ 'art-tags' ]
        .split(/, ?/u)
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
    });
    res.redirect(303, `/admin/art/${savedArt._id}`, next);
  } catch (e) {
    req.log.warn(`Issue found when trying to create new art piece :: ${e.message}`);
    res.redirect(303, '/admin/art/new', next);
  }
};

module.exports = postNewArtPiece;
