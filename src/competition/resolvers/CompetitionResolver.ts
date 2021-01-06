import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import Competition from "../../db/models/Competition.entity";
import CompetitionService from "../CompetitionService";
import { NotFoundException } from '@nestjs/common';

@Resolver()
export class CompetitionResolver {
    private readonly competitionService: CompetitionService;

    constructor(competitionService: CompetitionService) {
        this.competitionService = competitionService;
    }

    @Query(() => [Competition])
    public async competitions(): Promise<Competition[]> {
        return this.competitionService.getCompetitions();
    }

    @Query(() => Competition, { nullable: true })
    public async getCompetition(@Args('leagueCode') code: string): Promise<Competition> {
        const competition = await this.competitionService.getCompetitionByCode(code);

        if (!competition) {
          throw new NotFoundException(`Competition not found for code: ${code}`);
        }

        return competition;
    }

    @Mutation(() => Competition)
    public async importCompetition(@Args({ name: 'leagueCode' }) leagueCode: string): Promise<Competition> {
        return this.competitionService.importCompetition(leagueCode);
    }
}
