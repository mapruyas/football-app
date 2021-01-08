import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Person } from '../db/models/Person.entity';
import { DataProvider } from '../data-provider/DataProviderInterface';
import { InjectRepository } from '@nestjs/typeorm';
import { Types } from '../Types';
import { Team } from '../db/models/Team.entity';
import { PersonDTO } from '../data-provider/PersonDTO';

@Injectable()
export default class PersonService {
  private readonly personRepository: Repository<Person>;
  private readonly dataProvider: DataProvider;

  constructor(@InjectRepository(Person) personRepository: Repository<Person>,
              @Inject(Types.DataProvider) dataProvider: DataProvider) {
    this.personRepository = personRepository;
    this.dataProvider = dataProvider;
  }

  async importTeamSquad(team: Team) {
    const teams = await this.dataProvider.getTeamDetails(team.externalId);

    for (const personDTO of teams.squad) {
      const person = await this.createPersonIfNotExists(personDTO);
      await this.addTeam(person, team);
    }
  }

  async createPersonIfNotExists(personDTO: PersonDTO) {
    const existingPerson = await this.getPersonByExternalId(personDTO.id);

    if (existingPerson) {
      return existingPerson;
    }

    return this.storePerson(personDTO);
  }

  async getPersonByExternalId(id: number) {
    return this.personRepository.findOne({
      where: {
        externalId: id
      },
      relations: []
    })
  }

  async storePerson(personDTO: PersonDTO): Promise<Person> {
    const person = this.personRepository.create({
      name: personDTO.name,
      externalId: personDTO.id,
      nationality: personDTO.nationality,
      dateOfBirth: personDTO.dateOfBirth,
      countryOfBirth: personDTO.countryOfBirth,
      position: personDTO.position,
      role: personDTO.role
    });

    return this.personRepository.save(person);
  }

  async addTeam(person: Person, team: Team) {
      if (person.teams) {
        const alreadyRelatedToTeam = person.teams.indexOf(team) !== -1;

        if (alreadyRelatedToTeam) {
          return;
        }

        person.teams.push(team);
      } else {
        person.teams = [team];
      }

      await this.personRepository.save(person);
  }
}
