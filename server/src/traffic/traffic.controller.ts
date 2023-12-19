import { Controller, Get, Param } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import {
    InternalServerException,
    BadRequestException,
} from 'src/common/httpError';
import log from 'src/common/log';

@Controller()
export class TrafficController {
    constructor(private trafficService: TrafficService) {}

    //Copy paste in postman/browser etc to test. http://localhost:4001/traffic
    @Get('traffic')
    GetTraffic() {
        const api = process.env.API_TRAFFIC_ENDPOINT;
        if (!api) {
            log.error('traffic api endpoint not found in .env file');
            throw new InternalServerException();
        }
        return this.trafficService.GetTraffic(api);
    }

    //Copy paste in postman/browser etc to test. http://localhost:4001/traffic/2023-12-19T17:15:00
    @Get('traffic/:datetime')
    GetTrafficByDatetime(@Param('datetime') datetime: string) {
        const api = process.env.API_TRAFFIC_ENDPOINT;
        if (!api) {
            log.error('traffic api endpoint not found in .env file');
            throw new InternalServerException();
        }

        const params = new URLSearchParams({
            date_time: datetime,
        });

        const url = api + '?' + params;
        return this.trafficService.GetTraffic(url);
    }
}
