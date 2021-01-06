import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany, ManyToMany, JoinTable,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Season } from './Season.entity';
import { Team } from './Team.entity';

@ObjectType()
@Entity('competition')
export default class Competition {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ name: 'external_id', type: 'int' })
    externalId: number;

    @Field()
    @Column({ name: 'name', type: 'varchar'})
    name: string;

    @Field()
    @Column({ name: 'code', type: 'varchar'})
    code: string;

    @Field()
    @Column({ name: 'area_name', type: 'varchar'})
    areaName: string;

    @CreateDateColumn({ name: 'created_at' })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field()
    updatedAt: Date;

    @OneToMany(() => Season, season => season.competition)
    @Field(() => [Season])
    seasons: Season[];

    @ManyToMany(() => Team, team => team.competitions)
    @JoinTable()
    @Field(() => [Team])
    teams: Team[];
}
