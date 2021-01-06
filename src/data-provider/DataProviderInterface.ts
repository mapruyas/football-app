import { CompetitionDTO } from './CompetitionDTO';
import { TeamDTO } from './TeamDTO';

export interface DataProvider {

    getCompetitionByCode(code: string): Promise<CompetitionDTO>;

    getTeamsForCompetition(competitionId: number): Promise<TeamDTO[]>;
}