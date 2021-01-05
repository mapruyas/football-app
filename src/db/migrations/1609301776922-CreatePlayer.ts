import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePlayer1609301211823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'player',
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
                    name: 'position',
                    type: 'varchar',
                    length: '45',
                    isNullable: false
                },
                {
                    name: 'country_of_birth',
                    type: 'varchar',
                    length: '45',
                    isNullable: false
                },
                {
                    name: 'nationality',
                    type: 'varchar',
                    length: '45',
                    isNullable: false
                },
                {
                    name: 'date_of_birth',
                    type: 'datetime',
                    isNullable: false,
                },
                {
                  name: 'team_id',
                  type: 'int',
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
            ], 
            foreignKeys: [
                {
                  columnNames: ['team_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'team',
                  onDelete: 'NO ACTION',
                  onUpdate: 'NO ACTION'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("player");
        const teamForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("team_id") !== -1);
        await queryRunner.dropForeignKey("player", teamForeignKey);
        await queryRunner.dropTable("player");
    }
}
