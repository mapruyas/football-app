import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { config } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import CompetitionModule from './competition/CompetitionModule';
import TeamModule from './team/TeamModule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: `mysql`,
      host: config.database.host,
      port: config.database.port,
      username: config.database.user,
      password: config.database.password,
      database: config.database.name,
      synchronize: false,
      entities: [
        __dirname + '/db/**/*.entity{.ts,.js}'
      ],
      autoLoadEntities: true,
      migrationsRun: false,
      logging: !!config.database.logEnabled,
      migrations: ['../src/db/migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: '../src/db/migrations'
      }
    }),
    CompetitionModule,
    TeamModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    })
  ]
})
export class AppModule {}
