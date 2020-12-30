import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompetition1609304720075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'competition',
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
                    name: 'code',
                    type: 'varchar',
                    length: '45',
                    isNullable: false
                },
                {
                    name: 'areaName',
                    type: 'varchar',
                    length: '45',
                    isNullable: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('competition');
    }

}
