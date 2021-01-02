import { Module } from "@nestjs/common";
import CompetitionService from "./CompetitionService";
import { TypeOrmModule } from "@nestjs/typeorm";
import Competition from "../db/models/Competition.entity";
import { CompetitionResolver } from "./resolvers/CompetitionResolver";
import { DataProviderModule } from "../data-provider/DataProviderModule";

@Module({
    imports: [
        TypeOrmModule.forFeature([Competition]),
        DataProviderModule
    ],
    providers: [CompetitionService, CompetitionResolver],
    exports: [CompetitionService, CompetitionResolver],
    controllers: []
})
export default class CompetitionModule {}
