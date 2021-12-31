import fs from 'fs';
import path from 'path';
import type { AxiosPromise } from 'axios';
import axios from 'axios';

import { AniListMediaTypes } from '../objects/anilist/AniListMediaTypes';
import bunyanLogger from '../logger/bunyan-logger';
import type { AniListResponse } from '../objects/anilist/AniListResponse';
const logger = bunyanLogger();

export default class AniListDataScraper {
  private readonly aniListAnimeQuery: string;

  private readonly aniListMangaQuery: string;

  public constructor () {
    this.aniListAnimeQuery = fs.readFileSync(
      path.join(__dirname, '../../', 'gql', 'animeAniList.gql'),
      { encoding: 'utf-8' },
    );
    this.aniListMangaQuery = fs.readFileSync(
      path.join(__dirname, '../../', 'gql', 'mangaAniList.gql'),
      { encoding: 'utf-8' },
    );
  }

  private static async performRequest (
    body: { query: any; variables: any },
  ): Promise<AxiosPromise<AniListResponse>> {
    return axios({
      url:     'https://graphql.anilist.co',
      method:  'POST',
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Accept':       'application/json',
      },
      data: body,
    });
  }

  public async getPageOfAniListAnimeResults (page = 0): Promise<AxiosPromise<AniListResponse>> {
    try {
      const query = this.aniListAnimeQuery;
      const variables = {
        page,
        mediaType: AniListMediaTypes.ANIME,
      };

      return await AniListDataScraper.performRequest({
        query,
        variables,
      });
    } catch (e: unknown) {
      logger.warn(`Unhandled exception when requesting aniList data :: ${(e as Error).message}`);
      throw e;
    }
  }

  public async getPageOfAniListMangaResults (page = 0): Promise<AxiosPromise<AniListResponse>> {
    try {
      const query = this.aniListMangaQuery;
      const variables = {
        page,
        mediaType: AniListMediaTypes.MANGA,
      };

      return await AniListDataScraper.performRequest({
        query,
        variables,
      });
    } catch (e: unknown) {
      logger.warn(`Unhandled exception when requesting aniList data :: ${(e as Error).message}`);
      throw e;
    }
  }
}
