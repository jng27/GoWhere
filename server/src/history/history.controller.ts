import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { BadRequestException } from 'src/common/httpError';
import log from 'src/common/log';
import { DBQuery, Query } from './models/history.interface';
import { Observable } from 'rxjs';
import { HistoryEntity } from './models/history.entity';
import * as dayjs from 'dayjs';

@Controller()
export class HistoryController {
    constructor(private historyService: HistoryService) {}

    //http://localhost:4001/history
    @UsePipes(new ValidationPipe({ transform: true }))
    @Post('history')
    RecordQuery(@Body() query: Query): Observable<Query> {
        if (!query.datetime || !query.location) {
            log.error(JSON.stringify(query));
            throw new BadRequestException('missing_or_invalid_body');
        }
        try {
            return this.historyService.RecordQuery(query);
        } catch (err) {
            log.error(
                'postgres error occured while attempting to create query record',
            );
            log.error(JSON.stringify(err));
        }
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @Get('history/:startdate?/:enddate?/:period?')
    async GetLatestQueries(
        @Param('startdate') startdate: string,
        @Param('enddate') enddate: string,
        @Param('period') period: string,
    ): Promise<DBQuery | DBQuery[] | Observable<Query[]> | HistoryEntity[]> {
        if (startdate && enddate) {
            log.debug('Verifying dates supplied');
            let converted_sd: Date, converted_ed: Date;
            const hours = parseInt(period) || null;

            if (period && (!hours || hours > 12))
                throw new BadRequestException('invalid_period');

            try {
                converted_sd = new Date(parseInt(startdate));
                converted_ed = new Date(parseInt(enddate));
            } catch (err) {
                log.error(JSON.stringify(err));
                log.debug(
                    `Invalid dates. startdate: ${startdate}, enddate: ${enddate}`,
                );
                throw new BadRequestException('invalid_date');
            }
            const now = new Date();
            if (!converted_sd || !converted_ed) {
                throw new BadRequestException('invalid_date');
            }
            if (converted_sd > now || converted_ed > now) {
                throw new BadRequestException('prohibited_future_date');
            }

            let dbResult;
            try {
                dbResult = await this.historyService.GetLatestQueryByDatetime(
                    BigInt(startdate),
                    BigInt(enddate),
                );
                if (!hours) return dbResult;
            } catch (err) {
                log.error(
                    'postgres error occured while attempting to get query records by dates',
                );
                log.error(JSON.stringify(err));
            }

            log.debug('Search result between dates and period');
            return await this.getResultWithinPeriod(dbResult, hours);
        } else {
            try {
                return this.historyService.GetLatestQueries();
            } catch (err) {
                log.error(
                    'postgres error occured while attempting to get all query records',
                );
                log.error(JSON.stringify(err));
            }
        }
    }

    async getResultWithinPeriod(dbResult: DBQuery[], hours: number) {
        if (dbResult.length < 2) return dbResult;
        var result: DBQuery;
        var queries = dbResult.length;
        const index = 0;
        for await (const dbQuery of dbResult) {
            const nextIndex = index + 1;
            const count = await this.searchResultWithinHour(
                dbResult,
                hours,
                dbQuery,
                nextIndex,
            );
            if (!result) {
                result = dbQuery;
                result.count = count;
            } else if (result.count < count) {
                result = dbQuery;
                result.count = count;
            }
            queries -= 1;
            if (queries === 0) {
                return result;
            }
        }
    }

    async searchResultWithinHour(
        dbResult: DBQuery[],
        hours: number,
        query: DBQuery,
        index: number,
        count: number = 0,
    ) {
        if (index >= dbResult.length) return count;
        const current = dayjs(query.datetime, 'HH:mm:ss');
        const next = dayjs(dbResult[index].datetime, 'HH:mm:ss');
        const hoursDiff = current.diff(next, 'hours');
        if (hoursDiff > 0 && hoursDiff <= hours) count += 1;
        return this.searchResultWithinHour(
            dbResult,
            hours,
            query,
            index + 1,
            count,
        );
    }
}
