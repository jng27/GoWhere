import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { HistoryEntity } from './models/history.entity';
import { Query } from './models/history.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(HistoryEntity)
        private readonly historyRepository: Repository<HistoryEntity>,
    ) {}

    RecordQuery(query: Query): Observable<Query> {
        return from(this.historyRepository.save(query));
    }

    GetLatestQueries(): Observable<Query[]> {
        return from(
            this.historyRepository.find({
                order: {
                    createdAt: 'DESC',
                },
                take: 10,
            }),
        );
    }

    async GetLatestQueryByDatetime(
        startdate: bigint,
        enddate: bigint,
    ): Promise<HistoryEntity[]> {
        const result = await this.historyRepository
            .createQueryBuilder('history')
            .select([
                `to_char(to_timestamp(history.datetime / 1000), 'dd-Mon-yyyy hh12:mi:ss.ff2 am') AS datetime`,
                'history.location AS location',
                'history.historyId AS id',
            ])
            .where(
                `CAST(history.datetime as BIGINT) > :startdate AND CAST(history.datetime as BIGINT) < :enddate`,
                {
                    startdate,
                    enddate,
                },
            )
            .limit(10)
            .orderBy('history.createdAt', 'DESC')
            .getRawMany();
        return result;
    }
}
