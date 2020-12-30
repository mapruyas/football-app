import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from './Team.entity';

@Entity('player')
export class Player {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'externalId', type: 'bigint', unsigned: true })
    externalId: number;

    @Column({ name: 'name', type: 'varchar'})
    name: string;

    @Column({ name: 'position', type: 'varchar'})
    position: string;

    @Column({ name: 'countryOfBirth', type: 'varchar'})
    countryOfBirth: string;

    @Column({ name: 'nationality', type: 'varchar'})
    nationality: string;

    @Column({ name: 'nationality', type: 'datetime'})
    dateOfBirth: Date;

    @ManyToOne(() => Team, team => team.players)
    team: Team;
}
