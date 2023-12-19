import { Module } from '@nestjs/common';
import { TrafficModule } from './traffic/traffic.module';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

@Module({
    imports: [TrafficModule, WeatherModule],
})
export class AppModule {}
