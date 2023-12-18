import { Injectable } from '@nestjs/common';
import { GetRequest } from '../common/utils';

@Injectable({})
export class TrafficService {
    async GetTraffic(params) {
        const url =
            'https://api.data.gov.sg/v1/transport/traffic-images' +
            '?' +
            params;
        return await GetRequest(url);
    }
}
