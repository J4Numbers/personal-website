import fs from 'fs';
import path from 'path';
import axios, {AxiosPromise} from 'axios';

import {AniListMediaTypes} from '../objects/anilist/AniListMediaTypes';
import bunyan_logger from '../logger/bunyan_logger';
import {AniListResponse} from '../objects/anilist/AniListResponse';
const logger = bunyan_logger();

export default class AniListDataScraper {
  private readonly aniListAnimeQuery: string;
  private readonly aniListMangaQuery: string;

  constructor () {
    this.aniListAnimeQuery = fs.readFileSync(
      path.join(__dirname, '../../', 'gql', 'animeAniList.gql'),
      { encoding: 'utf-8' },
    );
    this.aniListMangaQuery = fs.readFileSync(
      path.join(__dirname, '../../', 'gql', 'mangaAniList.gql'),
      { encoding: 'utf-8' },
    );
  }

  async performRequest (body: { query: any, variables: any }): Promise<AxiosPromise<AniListResponse>> {
    return axios({
      url:     'https://graphql.anilist.co',
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':       'application/json',
      },
      data: body,
    });
  }

  async getPageOfAniListAnimeResults (page = 0): Promise<AxiosPromise<AniListResponse>> {
    try {
      const query = this.aniListAnimeQuery;
      const variables = {
        page,
        mediaType: AniListMediaTypes.ANIME,
      };

      return await this.performRequest({
        query,
        variables,
      });
    } catch (e) {
      logger.warn(`Unhandled exception when requesting aniList data :: ${(e as Error).message}`);
      throw e;
    }
  }

  async getPageOfAniListMangaResults (page = 0): Promise<AxiosPromise<AniListResponse>> {
    try {
      const query = this.aniListMangaQuery;
      const variables = {
        page,
        mediaType: AniListMediaTypes.MANGA,
      };

      return await this.performRequest({
        query,
        variables,
      });
    } catch (e) {
      logger.warn(`Unhandled exception when requesting aniList data :: ${(e as Error).message}`);
      throw e;
    }
  }
}
