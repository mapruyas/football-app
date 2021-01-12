import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Team } from '../db/models/Team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetitionTeamDTO } from '../data-provider/CompetitionTeamDTO';
import Competition from '../db/models/Competition.entity';
import { Types } from '../Types';
import { DataProvider } from '../data-provider/DataProviderInterface';
import PersonService from '../person/PersonService';

@Injectable()
export default class TeamService {
  private readonly teamRepository: Repository<Team>;
  private readonly dataProvider: DataProvider;
  private readonly personService: PersonService;

  constructor(@InjectRepository(Team) teamRepository: Repository<Team>,
              @Inject(Types.DataProvider) dataProvider: DataProvider,
              personService: PersonService) {
    this.teamRepository = teamRepository;
    this.dataProvider = dataProvider;
    this.personService = personService;
  }

  async importCompetitionTeams(competition: Competition) {
      const teamDTOs: CompetitionTeamDTO[] = await this.dataProvider.getTeamsForCompetition(competition.externalId);

      for (const inputTeam of teamDTOs) {
          const team = await this.createTeamIfNotExists(inputTeam);
          await this.addCompetition(team, competition);
          await this.personService.importTeamSquad(team);
      }
  }

  async createTeamIfNotExists(teamDTO: CompetitionTeamDTO): Promise<Team> {
      const existingTeam = await this.getTeamByExternalId(teamDTO.id);

      if (existingTeam) {
        return existingTeam;
      }

      return this.storeTeam(teamDTO);
  }

  async addCompetition(team: Team, competition: Competition) {
      if (team.competitions) {
        const competitionAlreadyAdded = team.competitions.indexOf(competition) !== -1;

        if (competitionAlreadyAdded) {
          return;
        }

        team.competitions.push(competition);
      } else {
        team.competitions = [competition];
      }

      await this.teamRepository.save(team);
  }

  async getTeamByExternalId(id: number) {
      return this.teamRepository.findOne({
          where: {
              externalId: id
          },
          relations: ['competitions']
      });
  }

  async storeTeam(teamDTO: CompetitionTeamDTO): Promise<Team> {
    const team = this.teamRepository.create({
      externalId: teamDTO.id,
      name: teamDTO.name,
      shortName: teamDTO.shortName,
      tla: teamDTO.tla,
      email: teamDTO.email
    });

    return this.teamRepository.save(team);
  }

  async getTeams(): Promise<Team[]> {
    return this.teamRepository.find({
      relations: ['players']
    });
  }

  async getTeamByName(name: string): Promise<Team | null> {
    return this.teamRepository.createQueryBuilder('team')
      .where("LOWER(team.name) = LOWER(:name)", { name })
      .getOne();
  }
}
