import { SeasonDTO } from './SeasonDTO';

export class CompetitionDTO {
  readonly code: string;
  readonly externalId: number;
  readonly name: string;
  readonly areaName: string;
  readonly seasons: SeasonDTO[];
}