import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany, JoinTable,
} from 'typeorm';
import { Person } from './Person.entity';
import { Season } from './Season.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import Competition from './Competition.entity';

@ObjectType()
@Entity('team')
export class Team {

    @PrimaryGeneratedColumn({ type: 'int' })
    @Field()
    id: number;

    @Column({ name: 'external_id', type: 'int' })
    @Field()
    externalId: number;

    @Column({ name: 'name', type: 'varchar'})
    @Field({nullable: true})
    name: string;

    @Column({ name: 'tla', type: 'varchar'})
    @Field()
    tla: string;

    @Column({ name: 'short_name', type: 'varchar'})
    @Field({nullable: true})
    shortName: string;

    @Column({ name: 'area_name', type: 'varchar', nullable: true})
    @Field({nullable: true})
    areaName: string;

    @Column({ name: 'email', type: 'varchar', nullable: true})
    @Field()
    email: string;

    @ManyToMany(() => Person, player => player.teams)
    @JoinTable()
    @Field(type => [Person])
    players: Person[];

    @ManyToMany(() => Competition, competition => competition.teams)
    @Field(() => [Competition], {nullable: true})
    competitions: Competition[];

    @OneToMany(() => Season, season => season.winner)
    @Field(() => [Season])
    winnedSeasons: Season[];

    @CreateDateColumn({ name: 'created_at' })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field()
    updatedAt: Date;
}
