import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../db/models/Team.entity';
import { DataProviderModule } from '../data-provider/DataProviderModule';
import TeamService from './TeamService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    DataProviderModule
  ],
  providers: [TeamService],
  exports: [TeamService]
})
export default class TeamModule {}
