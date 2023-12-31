import { Injectable } from '@nestjs/common';
import { GetRequest } from '../common/utils';

@Injectable({})
export class TrafficService {
    async GetTraffic(url: string) {
        return await GetRequest(url);
    }
}
