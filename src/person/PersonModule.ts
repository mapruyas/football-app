import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../db/models/Person.entity';
import { DataProviderModule } from '../data-provider/DataProviderModule';
import PersonService from './PersonService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    DataProviderModule
  ],
  providers: [PersonService],
  exports: [PersonService]
})
export default class PersonModule {}
