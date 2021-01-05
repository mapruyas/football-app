import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Season } from '../db/models/Season.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../db/models/Team.entity';
import { SeasonDTO } from '../data-provider/SeasonDTO';

@Injectable()
export default class SeasonService {
  private readonly seasonRepository: Repository<Season>;

  constructor(@InjectRepository(Season) seasonRepository: Repository<Season>) {
    this.seasonRepository = seasonRepository;
  }

  async createSeason(seasonDTO: SeasonDTO): Promise<Season> {
      const season = this.seasonRepository.create({
          startDate: seasonDTO.startDate,
          endDate: seasonDTO.endDate,
          currentMatchday: seasonDTO.currentMatchDay,
          winner: null
      });

      return this.seasonRepository.save(season);
  }
}
