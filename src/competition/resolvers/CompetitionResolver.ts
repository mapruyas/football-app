import { Resolver, Query, Args, Mutation, Int } from "@nestjs/graphql";
import Competition from "../../db/models/Competition.entity";
import CompetitionService from "../CompetitionService";

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
        return this.competitionService.getCompetitionByCode(code);
    }

    @Mutation(() => Competition)
    public async importCompetition(@Args({ name: 'leagueCode', type: () => Int }) leagueCode: number): Promise<Competition> {
        return this.competitionService.importCompetition(leagueCode);
    }
}
