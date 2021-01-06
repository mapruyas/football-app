import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSeason1609648354265 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'season',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'start_date',
            type: 'datetime',
            isNullable: false
          },
          {
            name: 'end_date',
            type: 'datetime',
            isNullable: false
          },
          {
            name: 'current_matchday',
            type: 'int',
            isNullable: true
          },
          {
            name: 'winner_id',
            type: 'int',
            isNullable: true
          },
          {
            name: 'competition_id',
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
            columnNames: ['winner_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'team',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
          },
          {
            columnNames: ['competition_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'competition',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("season");
        const teamForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("winner_id") !== -1);
        const competitionForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("competition_id") !== -1);
        await queryRunner.dropForeignKey("season", teamForeignKey);
        await queryRunner.dropForeignKey("season", competitionForeignKey);
        await queryRunner.dropTable("season");
    }
}
