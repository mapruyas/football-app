import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Team } from './Team.entity';
import { Field, ObjectType } from '@nestjs/graphql';

export enum Role {
  PLAYER = 'player',
  COACH = 'coach',
  REFEREE = 'referee'
}

@ObjectType()
@Entity('player')
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

    @Column({ name: 'position', type: 'varchar'})
    @Field()
    position: string;

    @Column({ name: 'country_of_birth', type: 'varchar'})
    @Field()
    countryOfBirth: string;

    @Column({ name: 'nationality', type: 'varchar'})
    @Field()
    nationality: string;

    @Column({ name: 'date_of_birth', type: 'datetime'})
    @Field()
    dateOfBirth: Date;

    @ManyToOne(() => Team, team => team.players)
    @Field(type => Team)
    team: Team;

    @Column({ name: 'role', type: 'enum', enum: Role})
    @Field()
    role: Role;

    @CreateDateColumn({ name: 'created_at' })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field()
    updatedAt: Date;
}
