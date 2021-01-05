import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTeam1609301211823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'team',
            columns: [
                {
                    name: 'id',
                    isPrimary: true,
                    type: 'int',
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                  name: 'externalId',
                  type: 'int',
                  unsigned: true,
                  isNullable: false
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '45',
                    isNullable: true
                },
                {
                    name: 'tla',
                    type: 'varchar',
                    length: '45',
                    isNullable: false
                },
                {
                    name: 'shortName',
                    type: 'varchar',
                    length: '45',
                    isNullable: false
                },
                {
                    name: 'areaName',
                    type: 'varchar',
                    length: '45',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '45',
                    isNullable: false
                },
                {
                  name: 'created_at',
                  type: 'datetime',
                  isNullable: false,
                  default: 'CURRENT_TIMESTAMP'
                },
                {
                  name: 'updated_at',
                  type: 'datetime',
                  isNullable: false,
                  default: 'CURRENT_TIMESTAMP'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('team');
    }

}
