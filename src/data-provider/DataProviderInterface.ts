import { CompetitionDTO } from './CompetitionDTO';
import { CompetitionTeamDTO } from './CompetitionTeamDTO';
import { TeamDTO } from './TeamDTO';

export interface DataProvider {

    getCompetitionByCode(code: string): Promise<CompetitionDTO>;

    getTeamsForCompetition(competitionId: number): Promise<CompetitionTeamDTO[]>;

    getTeamDetails(teamId: number): Promise<TeamDTO>;
}