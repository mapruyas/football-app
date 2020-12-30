import { Module } from '@nestjs/common';
import { config } from '../config';
import { Types } from 'src/Types';
import { FootballDataOrgProvider } from './impl/FootballDataOrgProvider';
import axios from 'axios';

@Module({
    imports: [],
    providers: [
        {
            provide: 'FootballDataApiKey',
            useValue: config.footballApp.apiKey
        },
        {
            provide: Types.AxiosInstance,
            useFactory: () => {
                return axios.create({
                    baseURL: `${config.footballApp.baseUrl}`,
                    timeout: config.footballApp.timeout
                });
            }
        },
        {
            provide: Types.DataProvider,
            useClass: FootballDataOrgProvider
        }
    ],
    exports: [Types.DataProvider]
})
export class DataProviderModule {}
