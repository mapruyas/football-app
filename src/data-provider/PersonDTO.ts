import { Role } from '../db/models/Person.entity';

export class PersonDTO {
  readonly id: number;
  readonly name: string;
  readonly position: string;
  readonly dateOfBirth: Date;
  readonly countryOfBirth: string;
  readonly nationality: string;
  readonly shirtNumber: number;
  readonly role: Role;
}
