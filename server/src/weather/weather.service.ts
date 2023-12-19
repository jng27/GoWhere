import { Injectable } from '@nestjs/common';
import { GetRequest } from '../common/utils';

@Injectable({})
export class WeatherService {
    async GetWeather(url: string) {
        return await GetRequest(url);
    }
}
