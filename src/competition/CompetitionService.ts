import { Repository } from "typeorm";
import Competition from "../db/models/Competition.entity";
import { InjectRepository } from "@nestjs/typeorm";
import CompetitionInput from "../competition/resolvers/inputs/CompetitionInput";
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DataProvider } from "../data-provider/DataProviderInterface";
import { Types } from "../Types";

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

    async getCompetitions(): Promise<Competition[]> {
        return this.competitionRepository.find();
    }

    async getCompetitionByCode(code: string): Promise<Competition> {
        const competition = await this.competitionRepository.findOne({
            where: {
                externalId: code
            }
        });

        if (!competition) {
          throw new NotFoundException(`Competition not found for code: ${code}`);
        }

        return competition;
    }

    async importCompetition(leagueCode: number): Promise<Competition> {
        const existingCompetition = await await this.competitionRepository.findOne({
          where: {
            externalId: leagueCode
          }
        });

        if (existingCompetition) {
          return existingCompetition;
        }

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