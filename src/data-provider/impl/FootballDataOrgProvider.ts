import { Inject, Injectable } from '@nestjs/common';
import { DataProvider } from '../DataProviderInterface';
import { AxiosInstance } from 'axios';
import { Types } from '../../Types';
import { CompetitionDTO } from '../CompetitionDTO';
import { TeamDTO } from '../TeamDTO';

@Injectable()
export class FootballDataOrgProvider implements DataProvider {

    private readonly apiKey: string;
    private readonly axios: AxiosInstance;

    constructor(
        @Inject('FootballDataApiKey') apiKey: string,
        @Inject(Types.AxiosInstance)  axios: AxiosInstance
    ) {
        this.apiKey = apiKey;
        this.axios = axios;
    }

    async getCompetitionByCode(code: string): Promise<CompetitionDTO> {
        const response = await this.axios.request({
            url: `/v2/competitions/${code}`,
            method: 'get',
            headers: {
                'X-Auth-Token': this.apiKey
            }
        });

        // console.log(response.data);
        // console.log(response.status);

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

    async getTeamsForCompetition(competitionId: number): Promise<TeamDTO[]> {
      const response = await this.axios.request({
        url: `/v2/competitions/${competitionId}/teams`,
        method: 'get',
        headers: {
          'X-Auth-Token': this.apiKey
        }
      });

      return response.data.teams;
    }
}
