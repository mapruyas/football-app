
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Player } from './Player.entity';

@Entity('team')
export class Team {

    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ name: 'externalId', type: 'bigint', unsigned: true })
    externalId: number;

    @Column({ name: 'name', type: 'varchar'})
    name: string;

    @Column({ name: 'tla', type: 'varchar'})
    tla: string;

    @Column({ name: 'shortName', type: 'varchar'})
    shortName: string;

    @Column({ name: 'areaName', type: 'varchar'})
    areaName: string;

    @Column({ name: 'email', type: 'varchar'})
    email: string;

    @OneToMany(() => Player, player => player.team)
    players: Player[];
}
