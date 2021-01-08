import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../db/models/Team.entity';
import { DataProviderModule } from '../data-provider/DataProviderModule';
import TeamService from './TeamService';
import PersonModule from '../person/PersonModule';
import { TeamResolver } from './resolvers/TeamResolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    DataProviderModule,
    PersonModule
  ],
  providers: [TeamService, TeamResolver],
  exports: [TeamService, TeamResolver]
})
export default class TeamModule {}
