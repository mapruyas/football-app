import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Team } from './Team.entity';
import { Field, ObjectType } from '@nestjs/graphql';

export enum Role {
  PLAYER = 'player',
  COACH = 'coach',
  REFEREE = 'referee',
  ASSISTANT_COACH = 'assistant_coach',
  GOALKEEPER_COACH = 'goalkeeper_coach',
  INTERIM_COACH = 'interim_coach',
  LOCAL_COACH = 'local_coach',
  ASSISTANT_TEAM_MANAGER = 'assistant_team_manager',
  SCOUT = 'scout'
}

@ObjectType()
@Entity('person')
export class Person {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({ name: 'external_id', type: 'int' })
    @Field()
    externalId: number;

    @Column({ name: 'name', type: 'varchar'})
    @Field()
    name: string;

    @Column({ name: 'position', type: 'varchar', nullable: true})
    @Field({nullable: true})
    position: string;

    @Column({ name: 'country_of_birth', type: 'varchar', nullable: true})
    @Field()
    countryOfBirth: string;

    @Column({ name: 'nationality', type: 'varchar', nullable: true})
    @Field()
    nationality: string;

    @Column({ name: 'date_of_birth', type: 'datetime', nullable: true})
    @Field()
    dateOfBirth: Date;

    @ManyToMany(() => Team, team => team.players)
    @Field(type => [Team])
    teams: Team[];

    @Column({ name: 'role', type: 'enum', enum: Role, nullable: true})
    @Field()
    role: Role;

    @CreateDateColumn({ name: 'created_at' })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field()
    updatedAt: Date;
}
