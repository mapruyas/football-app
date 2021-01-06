import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Team } from '../db/models/Team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamDTO } from '../data-provider/TeamDTO';
import Competition from '../db/models/Competition.entity';
import { Types } from '../Types';
import { DataProvider } from '../data-provider/DataProviderInterface';

@Injectable()
export default class TeamService {
  private readonly teamRepository: Repository<Team>;
  private readonly dataProvider: DataProvider;

  constructor(@InjectRepository(Team) teamRepository: Repository<Team>,
              @Inject(Types.DataProvider) dataProvider: DataProvider) {
    this.teamRepository = teamRepository;
    this.dataProvider = dataProvider;
  }

  async importCompetitionTeams(competition: Competition) {
      const teamDTOs: TeamDTO[] = await this.dataProvider.getTeamsForCompetition(competition.externalId);

      for (const inputTeam of teamDTOs) {
          const team = await this.createTeamIfNotExists(inputTeam);
          await this.addCompetition(team, competition);
      }
  }

  async createTeamIfNotExists(teamDTO: TeamDTO): Promise<Team> {
      const existingTeam = await this.getTeamById(teamDTO.id);

      if (existingTeam) {
        return existingTeam;
      }

      return this.storeTeam(teamDTO);
  }

  async addCompetition(team: Team, competition: Competition) {
      if (team.competitions) {
        const competitionAlreadyAdded = team.competitions.indexOf(competition) !== -1;

        if (!competitionAlreadyAdded) {
          team.competitions.push(competition);
        }
      } else {
        team.competitions = [competition];
      }

      await this.teamRepository.save(team);
  }

  async getTeamById(id: number) {
      return this.teamRepository.findOne({
          where: {
              id
          },
          relations: ['competitions']
      });
  }

  async getTeamByExternalId(id: number) {
      return this.teamRepository.findOne({
          where: {
              externalId: id
          },
          relations: ['competitions']
      });
  }

  async storeTeam(teamDTO: TeamDTO) {
    const team = this.teamRepository.create({
      externalId: teamDTO.id,
      name: teamDTO.name,
      shortName: teamDTO.shortName,
      tla: teamDTO.tla,
      email: teamDTO.email
    });

    return this.teamRepository.save(team);
  }
}