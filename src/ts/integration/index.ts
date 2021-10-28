import AniListDataScraper from './anilist-data-scraper';

let aniListDataScraper: AniListDataScraper;

export function fetchAniListDataScraper () {
  if (aniListDataScraper === undefined) {
    aniListDataScraper = new AniListDataScraper();
  }
  return aniListDataScraper;
}
