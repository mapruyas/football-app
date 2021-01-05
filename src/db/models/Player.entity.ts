import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Team } from './Team.entity';

export enum Role {
  PLAYER = 'player',
  COACH = 'coach',
  REFEREE = 'referee'
}

@Entity('player')
export class Person {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'external_id', type: 'int' })
    externalId: number;

    @Column({ name: 'name', type: 'varchar'})
    name: string;

    @Column({ name: 'position', type: 'varchar'})
    position: string;

    @Column({ name: 'country_of_birth', type: 'varchar'})
    countryOfBirth: string;

    @Column({ name: 'nationality', type: 'varchar'})
    nationality: string;

    @Column({ name: 'date_of_birth', type: 'datetime'})
    dateOfBirth: Date;

    @ManyToOne(() => Team, team => team.players)
    team: Team;

    @Column({ name: 'role', type: 'enum', enum: Role})
    role: Role;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
