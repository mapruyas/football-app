export class Utils {

  static getCompetitionQueryForLeagueCode(leagueCode: string): string {
    return `{getCompetition(leagueCode: "${leagueCode}") {id name areaName externalId code}}`;
  }

  static getImportCompetitionMutationForLeagueCode(leagueCode: string): string {
    return `mutation {importCompetition(leagueCode: ${leagueCode}) {id name externalId code areaName}}`
  }

  static getAllCompetitionsQuery(): string {
    return `{competitions { id name areaName externalId code }}`
  }
}
