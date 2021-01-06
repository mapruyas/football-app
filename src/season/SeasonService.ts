import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Season } from '../db/models/Season.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SeasonDTO } from '../data-provider/SeasonDTO';
import Competition from '../db/models/Competition.entity';
import { Team } from '../db/models/Team.entity';
import TeamService from '../team/TeamService';

@Injectable()
export default class SeasonService {
  private readonly seasonRepository: Repository<Season>;
  private readonly teamService: TeamService;

  constructor(@InjectRepository(Season) seasonRepository: Repository<Season>,
              teamService: TeamService) {
    this.seasonRepository = seasonRepository;
    this.teamService = teamService;
  }

  async createSeason(seasonDTO: SeasonDTO, competition: Competition): Promise<Season> {
      const winner = await this.getSeasonWinner(seasonDTO);
      const season = this.seasonRepository.create({
          startDate: seasonDTO.startDate,
          endDate: seasonDTO.endDate,
          currentMatchday: seasonDTO.currentMatchday,
          winner,
          competition
      });

      return this.seasonRepository.save(season);
  }

  private async getSeasonWinner(seasonDTO: SeasonDTO): Promise<Team | null> {
      if (!seasonDTO.winner) {
          return null;
      }

      return this.teamService.getTeamByExternalId(seasonDTO.winner.id);
  }
}
