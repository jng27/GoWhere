import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryEntity } from './models/history.entity';

@Module({
    imports: [TypeOrmModule.forFeature([HistoryEntity])],
    controllers: [HistoryController],
    providers: [HistoryService],
})
export class HistoryModule {}
