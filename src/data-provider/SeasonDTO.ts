import { TeamDTO } from './TeamDTO';

export class SeasonDTO {
  readonly id: number;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly currentMatchDay: number;
  readonly winner: TeamDTO;
}
