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
        }));

        await queryRunner.createTable(new Table({
          name: 'competition_teams_team',
          columns: [
            {
              name: 'competition_id',
              type: 'int',
              isPrimary: true,
              isNullable: false
            },
            {
              name: 'team_id',
              type: 'int',
              isPrimary: true,
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
              columnNames: ['competition_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'competition',
              onDelete: 'NO ACTION',
              onUpdate: 'NO ACTION'
            },
            {
              columnNames: ['team_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'team',
              onDelete: 'NO ACTION',
              onUpdate: 'NO ACTION'
            }
          ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const competitionTable = await queryRunner.getTable("competition_teams_team");
        const competitionTeamForeignKey = competitionTable.foreignKeys.find(fk => fk.columnNames.indexOf("team_id") !== -1);
        const competitionForeignKey = competitionTable.foreignKeys.find(fk => fk.columnNames.indexOf("competition_id") !== -1);
        await queryRunner.dropForeignKey("competition_teams_team", competitionTeamForeignKey);
        await queryRunner.dropForeignKey("competition_teams_team", competitionForeignKey);
        await queryRunner.dropTable("competition_teams_team");

        await queryRunner.dropTable('competition');
    }

}
