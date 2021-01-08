import { CompetitionTeamDTO } from './CompetitionTeamDTO';

export class SeasonDTO {
  readonly id: number;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly currentMatchday: number;
  readonly winner: CompetitionTeamDTO;
}
