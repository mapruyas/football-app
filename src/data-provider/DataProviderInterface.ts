import CompetitionInput from "src/competition/resolvers/inputs/CompetitionInput";

export interface DataProvider {

    getCompetitionByCode(code: number): Promise<CompetitionInput>;
}