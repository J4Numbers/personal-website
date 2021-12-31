import type { AniListAnimeDataItem } from './AniListAnimeDataItem';
import type { AniListMangaDataItem } from './AniListMangaDataItem';
import type { AniListPageDetails } from './AniListPageDetails';

export type AniListTypes = AniListAnimeDataItem | AniListMangaDataItem;

export interface AniListResponse {
  data: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Page: {
      pageInfo: AniListPageDetails;
      mediaList: Array<AniListTypes>;
    };
  };
}
