import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from '../db/models/Season.entity';
import { DataProviderModule } from '../data-provider/DataProviderModule';
import SeasonService from './SeasonService';
import TeamModule from '../team/TeamModule';

@Module({
    imports: [
      TypeOrmModule.forFeature([Season]),
      DataProviderModule,
      TeamModule
    ],
    providers: [SeasonService],
    exports: [SeasonService]
})
export default class SeasonModule {}
