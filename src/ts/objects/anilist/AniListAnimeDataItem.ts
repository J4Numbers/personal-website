export interface AniListAnimeDataItem {
  id: number,
  score: number,
  status: string,
  progress: number,
  media: {
    id: number,
    idMal: number,
    description: string,
    episodes: number,
    status: string,
    type: string,
    title: {
      romaji: string,
      english: string,
      native: string,
    },
    coverImage: {
      large: string,
      medium: string,
    },
  },
}
