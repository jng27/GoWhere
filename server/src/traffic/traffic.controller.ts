import { Controller, Get, Param } from '@nestjs/common';
import { TrafficService } from './traffic.service';

@Controller()
export class TrafficController {
    constructor(private trafficService: TrafficService) {}

    //http://localhost:4001/traffic/2023-12-19T17:15:00
    @Get('traffic/:datetime')
    GetTraffic(@Param('datetime') datetime: string) {
        const params = new URLSearchParams({
            date_time: datetime,
        });
        return this.trafficService.GetTraffic(params);
    }
}
