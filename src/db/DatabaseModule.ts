import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Competition from './models/Competition.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            Competition
        ])
    ],
})
class DatabaseModule {}

export default DatabaseModule;
