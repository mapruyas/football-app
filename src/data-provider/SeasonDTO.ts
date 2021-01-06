import { TeamDTO } from './TeamDTO';

export class SeasonDTO {
  readonly id: number;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly currentMatchday: number;
  readonly winner: TeamDTO;
}
