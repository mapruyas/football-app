import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, JoinTable, ManyToMany,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from './Team.entity';
import Competition from './Competition.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('season')
export class Season {

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ name: 'start_date', type: 'date' })
  @Field()
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  @Field()
  endDate: Date;

  @Column({ name: 'current_matchday', type: 'int' , nullable: true})
  @Field({nullable: true})
  currentMatchday: number;

  @CreateDateColumn({ name: 'created_at' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field()
  updatedAt: Date;

  @OneToOne(() => Team)
  @JoinColumn({
    name: 'winner_id',
    referencedColumnName: 'id'
  })
  @Field(type => Team, {nullable: true})
  winner: Team;

  @ManyToOne(() => Competition, competition => competition.seasons)
  @JoinColumn({
    name: 'competition_id',
    referencedColumnName: 'id'
  })
  @Field(type => Competition)
  competition: Competition;
}