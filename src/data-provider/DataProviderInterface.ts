import CompetitionInput from "../competition/resolvers/inputs/CompetitionInput";

export interface DataProvider {

    getCompetitionByCode(code: number): Promise<CompetitionInput>;
}