import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany, JoinTable,
} from 'typeorm';
import { Person } from './Player.entity';
import { Season } from './Season.entity';

@Entity('team')
export class Team {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ name: 'external_id', type: 'int' })
    externalId: number;

    @Column({ name: 'name', type: 'varchar'})
    name: string;

    @Column({ name: 'tla', type: 'varchar'})
    tla: string;

    @Column({ name: 'short_name', type: 'varchar'})
    shortName: string;

    @Column({ name: 'area_name', type: 'varchar'})
    areaName: string;

    @Column({ name: 'email', type: 'varchar'})
    email: string;

    @OneToMany(() => Person, player => player.team)
    players: Person[];

    @ManyToMany(() => Season, season => season.teams)
    @JoinTable()
    seasons: Season[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
