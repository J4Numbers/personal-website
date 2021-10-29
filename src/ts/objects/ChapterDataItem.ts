import BasicDataItem from './BasicDataItem';

export interface ChapterDataItem extends BasicDataItem {
  'parent_story_id': string,
  'chapter_number': number,
  'chapter_title': string,
  'chapter_text': string,
  'time_posted': Date,
  'time_updated': Date,
  'author_notes': string,
}
