import AniListDataScraper from './anilist-data-scraper';

let aniListDataScraper: AniListDataScraper | undefined;

export function fetchAniListDataScraper (): AniListDataScraper {
  if (aniListDataScraper === undefined) {
    aniListDataScraper = new AniListDataScraper();
  }
  return aniListDataScraper;
}
