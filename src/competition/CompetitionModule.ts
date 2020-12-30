import { Module } from "@nestjs/common";
import CompetitionService from "./CompetitionService";
import { TypeOrmModule } from "@nestjs/typeorm";
import Competition from "src/db/models/Competition.entity";
import { CompetitionResolver } from "./resolvers/CompetitionResolver";
import { CompetitionController } from "./CompetitionController";
import { DataProviderModule } from "src/data-provider/DataProviderModule";

@Module({
    imports: [
        TypeOrmModule.forFeature([Competition]),
        DataProviderModule
    ],
    providers: [CompetitionService, CompetitionResolver],
    exports: [CompetitionService, CompetitionResolver],
    controllers: [CompetitionController]
})
export default class CompetitionModule {}
