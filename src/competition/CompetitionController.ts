import CompetitionService from "./CompetitionService";
import { Get, Controller } from "@nestjs/common";
import Competition from "src/db/models/Competition.entity";

@Controller()
export class CompetitionController {
    constructor(private readonly competitionService: CompetitionService) {}

    @Get()
    async getCompetitions(): Promise<Competition[]> {
        return this.competitionService.getCompetitions();
    }
}