import { Module } from "@nestjs/common";
import CompetitionService from "./CompetitionService";
import { TypeOrmModule } from "@nestjs/typeorm";
import Competition from "../db/models/Competition.entity";
import { CompetitionResolver } from "./resolvers/CompetitionResolver";
import { DataProviderModule } from "../data-provider/DataProviderModule";
import SeasonModule from '../season/SeasonModule';
import TeamModule from '../team/TeamModule';

@Module({
    imports: [
        TypeOrmModule.forFeature([Competition]),
        DataProviderModule,
        SeasonModule,
        TeamModule
    ],
    providers: [CompetitionService, CompetitionResolver],
    exports: [CompetitionService, CompetitionResolver]
})
export default class CompetitionModule {}
