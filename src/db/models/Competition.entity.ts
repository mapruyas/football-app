import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity('competition')
export default class Competition {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ name: 'externalId', type: 'bigint', unsigned: true })
    externalId: number;

    @Field()
    @Column({ name: 'name', type: 'varchar'})
    name: string;

    @Field()
    @Column({ name: 'code', type: 'varchar'})
    code: string;

    @Field()
    @Column({ name: 'areaName', type: 'varchar'})
    areaName: string;
}
