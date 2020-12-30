import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { DataProvider } from "../DataProviderInterface";
import { AxiosInstance } from 'axios';
import { Types } from "../../Types";
import CompetitionInput from "src/competition/resolvers/inputs/CompetitionInput";

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

    async getCompetitionByCode(code: number): Promise<CompetitionInput> {
        const response = await this.axios.request({
            url: `/v2/competitions/${code}`,
            method: 'get',
            headers: {
                'X-Auth-Token': this.apiKey
            }
        });

        console.log(response.data);
        console.log(response.status);

        return {
            name: response.data.name,
            externalId: response.data.id,
            code: response.data.code,
            areaName: response.data.area.name
        };
    }
}
