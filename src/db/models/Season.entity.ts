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

@Entity('season')
export class Season {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ name: 'current_matchday', type: 'int' })
  currentMatchday: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Team, team => team.seasons)
  teams: Team[];

  @OneToOne(() => Team)
  @JoinColumn({
    name: 'winnerId',
    referencedColumnName: 'id'
  })
  winner: Team;

  @ManyToOne(() => Competition, competition => competition.seasons)
  competition: Competition;
}