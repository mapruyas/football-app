import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { Role } from '../models/Person.entity';

export class CreatePlayer1609301211823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'person',
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
                    isNullable: true,
                    charset: 'utf8'
                },
                {
                    name: 'position',
                    type: 'varchar',
                    length: '45',
                    isNullable: true
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
                    isNullable: false,
                    charset: 'utf8'
                },
                {
                    name: 'date_of_birth',
                    type: 'datetime',
                    isNullable: true,
                },
                {
                  name: 'role',
                  type: 'enum',
                  enum: [Role.PLAYER, Role.COACH, Role.REFEREE, Role.ASSISTANT_COACH, Role.GOALKEEPER_COACH, Role.INTERIM_COACH, Role.LOCAL_COACH, Role.ASSISTANT_TEAM_MANAGER, Role.SCOUT],
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
        name: 'team_players_person',
        columns: [
          {
            name: 'personId',
            type: 'int',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'teamId',
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
            columnNames: ['personId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'person',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
          },
          {
            columnNames: ['teamId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'team',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("player");
        const teamForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("team_id") !== -1);
        await queryRunner.dropForeignKey("player", teamForeignKey);
        await queryRunner.dropTable("player");
    }
}
