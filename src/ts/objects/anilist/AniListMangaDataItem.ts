export interface AniListMangaDataItem {
  id: number;
  score: number;
  status: string;
  progress: number;
  progressVolumes: number;
  media: {
    id: number;
    idMal: number;
    description: string;
    volumes: number;
    chapters: number;
    status: string;
    type: string;
    format: string;
    title: {
      romaji: string;
      english: string;
      native: string;
    };
    coverImage: {
      large: string;
      medium: string;
    };
  };
}
