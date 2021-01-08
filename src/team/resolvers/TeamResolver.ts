import { Args, Query, Resolver } from '@nestjs/graphql';
import TeamService from '../TeamService';
import { Team } from '../../db/models/Team.entity';
import { NotFoundException } from '@nestjs/common';

@Resolver()
export class TeamResolver {
  private readonly teamService: TeamService;

  constructor(teamService: TeamService) {
    this.teamService = teamService;
  }

  @Query(() => [Team])
  public async teams(): Promise<Team[]> {
    return this.teamService.getTeams();
  }

  @Query(() => Team, { nullable: true })
  public async getTeam(@Args('teamName') name: string): Promise<Team> {
    const team = await this.teamService.getTeamByName(name);

    if (!team) {
      throw new NotFoundException(`Team not found: ${name}`);
    }

    return team;
  }
}
