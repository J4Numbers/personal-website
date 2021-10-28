import {AniListAnimeDataItem} from './AniListAnimeDataItem';
import {AniListMangaDataItem} from './AniListMangaDataItem';
import {AniListPageDetails} from './AniListPageDetails';

export type AniListTypes = AniListAnimeDataItem | AniListMangaDataItem;

export interface AniListResponse {
  data: {
    Page: {
      pageInfo: AniListPageDetails,
      mediaList: Array<AniListTypes>,
    }
  },
}
