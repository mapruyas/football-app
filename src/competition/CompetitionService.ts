import { Repository } from 'typeorm';
import Competition from '../db/models/Competition.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { DataProvider } from '../data-provider/DataProviderInterface';
import { Types } from '../Types';
import SeasonService from '../season/SeasonService';
import { CompetitionDTO } from '../data-provider/CompetitionDTO';
import { SeasonDTO } from '../data-provider/SeasonDTO';
import { TeamDTO } from '../data-provider/TeamDTO';
import TeamService from '../team/TeamService';

@Injectable()
export default class CompetitionService {
    private readonly competitionRepository: Repository<Competition>;
    private readonly dataProvider: DataProvider;
    private readonly seasonService: SeasonService;
    private readonly teamService: TeamService;

    constructor(
        @InjectRepository(Competition) competitionRepository: Repository<Competition>,
        @Inject(Types.DataProvider) dataProvider: DataProvider,
        seasonService: SeasonService,
        teamService: TeamService
    ) {
        this.competitionRepository = competitionRepository;
        this.dataProvider = dataProvider;
        this.seasonService = seasonService;
        this.teamService = teamService;
    }

    async getCompetitions(): Promise<Competition[]> {
        return this.competitionRepository.find();
    }

    async getCompetitionByCode(code: string): Promise<Competition> {
        return await this.competitionRepository.findOne({
            where: {
                externalId: code
            },
            relations: ['seasons', 'teams']
        });
    }

    async importCompetition(leagueCode: string): Promise<Competition> {
        const existingCompetition = await this.getCompetitionByCode(leagueCode);

        if (existingCompetition) {
          return existingCompetition;
        }

        const competitionDTO: CompetitionDTO = await this.dataProvider.getCompetitionByCode(leagueCode);
        console.log(competitionDTO);

        const competition = await this.storeCompetition(competitionDTO);
        await this.teamService.importCompetitionTeams(competition);
        await this.importCompetitionSeasons(competitionDTO.seasons, competition);

        return this.getCompetitionByCode(leagueCode)
    }

    async storeCompetition(input: CompetitionDTO): Promise<Competition> {
        const competition = this.competitionRepository.create({
            externalId: input.externalId,
            code: input.code,
            areaName: input.areaName,
            name: input.name
        });

        return this.competitionRepository.save(competition);
    }

    private async importCompetitionSeasons(seasons: SeasonDTO[], competition: Competition) {
        for (const inputSeason of seasons) {
          await this.seasonService.createSeason(inputSeason, competition);
        }
    }
}