import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Season } from './Season.entity';

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
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Season, season => season.competition)
    seasons: Season[];
}
