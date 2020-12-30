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
                    name: 'position',
                    type: 'varchar',
                    length: '45',
                    isNullable: false
                },
                {
                    name: 'countryOfBirth',
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
                    name: 'dateOfBirth',
                    type: 'datetime',
                    isNullable: false,
                },
                {
                  name: 'teamId',
                  type: 'int',
                  isNullable: false
                }
            ], 
            foreignKeys: [
                {
                  columnNames: ['teamId'],
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
        const teamForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("teamId") !== -1);
        await queryRunner.dropForeignKey("player", teamForeignKey);
        await queryRunner.dropTable("player");
    }

}
