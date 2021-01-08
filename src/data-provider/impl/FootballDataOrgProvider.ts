import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { DataProvider } from '../DataProviderInterface';
import { AxiosInstance, AxiosResponse } from 'axios';
import { Types } from '../../Types';
import { CompetitionDTO } from '../CompetitionDTO';
import { CompetitionTeamDTO } from '../CompetitionTeamDTO';
import { TeamDTO } from '../TeamDTO';
import { Cache } from 'cache-manager';
import * as promiseRetry from 'promise-retry';

@Injectable()
export class FootballDataOrgProvider implements DataProvider {

    private readonly apiKey: string;
    private readonly axios: AxiosInstance;

    constructor(
        @Inject('FootballDataApiKey') apiKey: string,
        @Inject(Types.AxiosInstance)  axios: AxiosInstance,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {
        this.apiKey = apiKey;
        this.axios = axios;
    }

    async getCompetitionByCode(code: string): Promise<CompetitionDTO> {
        const response = await this.getRequest(`/v2/competitions/${code}`);
        const competition = response.data;

        return {
            name: competition.name,
            externalId: competition.id,
            code: competition.code,
            areaName: competition.area.name,
            seasons: competition.seasons.map(s => {
              return {
                id: s.id,
                startDate: s.startDate,
                endDate: s.endDate,
                currentMatchday: s.currentMatchday,
                winner: s.winner,
              }
            })
        };
    }

    async getTeamsForCompetition(competitionId: number): Promise<CompetitionTeamDTO[]> {
      const response = await this.getRequestWithRetry(`/v2/competitions/${competitionId}/teams`);
      return response.data.teams;
    }

    async getTeamDetails(teamId: number): Promise<TeamDTO> {
      const response = await this.getRequestWithRetry(`/v2/teams/${teamId}`);
      return response.data;
    }

    private async getRequestWithRetry(path: string): Promise<AxiosResponse> {
      return promiseRetry((retry, number) => {
        console.log(`Attempt number: ${number}`);
        return this.getRequest(path).catch((err) => {
          console.error(err);
          retry(err);
        })
      }, {
        minTimeout: 62 * 1000
      })
    }

    private async getRequest(path: string): Promise<AxiosResponse> {
      // const lock = await this.cacheManager.get('rate_lock');
      // if (lock) {
      //   const requestsMade = await this.cacheManager.get('requestsMade');
      //   if (requestsMade < 10) {
      //     await this.cacheManager.set('requestsMade', requestsMade + 1, 65);
      //   } else {
      //     await this.sleep()
      //   }
      // } else {
      //   await this.cacheManager.set('rate_lock', 1, 60);
      //   await this.cacheManager.set('requestsMade', 1, 65);
      // }

      return this.axios.request({
        url: path,
        method: 'get',
        headers: {
          'X-Auth-Token': this.apiKey
        }
      });
    }

    private async sleep(seconds: number) {
      return new Promise(resolve => {setTimeout(resolve, seconds * 1000);});
    }
}
