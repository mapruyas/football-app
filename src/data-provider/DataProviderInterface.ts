import { CompetitionDTO } from './CompetitionDTO';

export interface DataProvider {

    getCompetitionByCode(code: number): Promise<CompetitionDTO>;
}