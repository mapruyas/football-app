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
                  name: 'external_id',
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
                    name: 'area_name',
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
        await queryRunner.dropTable('competition');
    }

}
