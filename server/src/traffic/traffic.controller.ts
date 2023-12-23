import { Controller, Get, Param } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { InternalServerException } from 'src/common/httpError';
import log from 'src/common/log';
import { TrafficApiResponse } from './types';
import * as NodeCache from 'node-cache';

const CACHETTL = parseInt(process.env.CACHETTL) || 1800;
const CACHEKEY = process.env.CACHE_TRAFFIC_KEY || 'traffic';
const nodeCache = new NodeCache({
    stdTTL: CACHETTL,
    checkperiod: CACHETTL - 2,
    deleteOnExpire: true,
});

@Controller()
export class TrafficController {
    constructor(private trafficService: TrafficService) {}

    //http://localhost:4001/traffic
    @Get('traffic')
    async GetTraffic(): Promise<TrafficApiResponse> {
        if (nodeCache.has(CACHEKEY)) return nodeCache.get(CACHEKEY);

        const api = process.env.API_TRAFFIC_ENDPOINT;
        if (!api) {
            log.error('traffic api endpoint not found in .env file');
            throw new InternalServerException();
        }

        try {
            const traffic = await this.trafficService.GetTraffic(api);
            nodeCache.set(CACHEKEY, traffic);
            return traffic;
        } catch (err) {
            log.error('axios faced an error while retrieving data');
            log.error(JSON.stringify(err));
            if (nodeCache.has(CACHEKEY)) return nodeCache.get(CACHEKEY);
            throw new InternalServerException();
        }
    }

    //http://localhost:4001/traffic/2023-12-19T17:15:00
    @Get('traffic/:datetime')
    async GetTrafficByDatetime(
        @Param('datetime') datetime: string,
    ): Promise<TrafficApiResponse> {
        const cacheKey = CACHEKEY + datetime;
        if (nodeCache.has(cacheKey)) return nodeCache.get(cacheKey);

        const api = process.env.API_TRAFFIC_ENDPOINT;
        if (!api) {
            log.error('traffic api endpoint not found in .env file');
            throw new InternalServerException();
        }

        const params = new URLSearchParams({
            date_time: datetime,
        });

        try {
            const url = api + '?' + params;
            const traffic = await this.trafficService.GetTraffic(url);
            nodeCache.set(cacheKey, traffic);
            return traffic;
        } catch (err) {
            log.error('axios faced an error while retrieving data');
            log.error(JSON.stringify(err));
            if (nodeCache.has(cacheKey)) return nodeCache.get(cacheKey);
            throw new InternalServerException();
        }
    }

    // async HandleCameraData(cameras: Array<Camera>) {
    //     const tempArray = [];
    //     var queries = cameras.length;
    //     cameras.forEach((camera) => {
    //         const latitude = camera.location.latitude;
    //         const longitude = camera.location.longitude;
    //         const config = {
    //             latitude: latitude,
    //             longitude: longitude,
    //         };
    //         if (queries === 90) {
    //             queries -= 1;
    //         }

    //         queries -= 1;
    //         if (queries === 0) return tempArray;
    //     });
    // }
}
