import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { InternalServerException } from 'src/common/httpError';
import log from 'src/common/log';

@Controller()
export class WeatherController {
    constructor(private weatherService: WeatherService) {}

    //Copy paste in postman/browser etc to test. http://localhost:4001/weather
    @Get('weather')
    GetTraffic() {
        const api = process.env.API_WEATHER_ENDPOINT;
        if (!api) {
            log.error('traffic api endpoint not found in .env file');
            throw new InternalServerException();
        }

        return this.weatherService.GetWeather(api);
    }

    //Copy paste in postman/browser etc to test. http://localhost:4001/weather/2023-12-19T17:15:00
    @Get('weather/:datetime')
    GetTrafficByDatetime(@Param('datetime') datetime: string) {
        const api = process.env.API_WEATHER_ENDPOINT;
        if (!api) {
            log.error('traffic api endpoint not found in .env file');
            throw new InternalServerException();
        }

        const params = new URLSearchParams({
            date_time: datetime,
        });
        const url = api + '?' + params;
        return this.weatherService.GetWeather(url);
    }
}
