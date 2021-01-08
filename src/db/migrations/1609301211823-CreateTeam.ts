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
                  name: 'external_id',
                  type: 'int',
                  unsigned: true,
                  isNullable: false
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                    charset: 'utf8'
                },
                {
                    name: 'tla',
                    type: 'varchar',
                    length: '45',
                    isNullable: false
                },
                {
                    name: 'short_name',
                    type: 'varchar',
                    length: '45',
                    isNullable: false,
                    charset: 'utf8'
                },
                {
                    name: 'area_name',
                    type: 'varchar',
                    length: '45',
                    isNullable: true
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '45',
                    isNullable: true
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
