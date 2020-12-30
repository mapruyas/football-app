import { Repository } from "typeorm";
import Competition from "src/db/models/Competition.entity";
import { InjectRepository } from "@nestjs/typeorm";
import CompetitionInput from "src/competition/resolvers/inputs/CompetitionInput";
import { Injectable, Inject } from "@nestjs/common";
import { DataProvider } from "src/data-provider/DataProviderInterface";
import { Types } from "src/Types";

@Injectable()
export default class CompetitionService {
    private readonly competitionRepository: Repository<Competition>;
    private readonly dataProvider: DataProvider;

    constructor(
        @InjectRepository(Competition) competitionRepository: Repository<Competition>,
        @Inject(Types.DataProvider) dataProvider: DataProvider
    ) {
        this.competitionRepository = competitionRepository;
        this.dataProvider = dataProvider
    }

    async getHello(): Promise<string> {
        return `it works! count: ${await this.competitionRepository.count()}`;
    }

    async getCompetitions(): Promise<Competition[]> {
        return this.competitionRepository.find();
    }

    async getCompetitionByCode(code: string): Promise<Competition> {
        return this.competitionRepository.findOne({
            where: {
                code
            }
        });
    }

    async importCompetition(leagueCode: number): Promise<Competition> {
        const competition = await this.dataProvider.getCompetitionByCode(leagueCode);
        return this.createCompetition(competition);
    }

    async createCompetition(input: CompetitionInput): Promise<Competition> {
        const competition = this.competitionRepository.create({
            externalId: input.externalId,
            code: input.code,
            areaName: input.areaName,
            name: input.name
        });

        return this.competitionRepository.save(competition);
    }
}