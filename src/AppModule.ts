import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { config } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import CompetitionModule from './competition/CompetitionModule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: `mysql`,
      host: config.database.host,
      port: config.database.port,
      username: config.database.user,
      password: config.database.password,
      database: config.database.name,
      synchronize: true,
      entities: [
        __dirname + '/db/**/*.entity{.ts,.js}'
      ],
      autoLoadEntities: true,
      migrationsRun: false,
      logging: config.database.logEnabled ? true : false,
      migrations: ['../src/db/migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: '../src/db/migrations'
      }
    }),
    CompetitionModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    })
  ]
})
export class AppModule {}
