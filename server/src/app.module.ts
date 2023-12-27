import { Module } from '@nestjs/common';
import { TrafficModule } from './traffic/traffic.module';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryModule } from './history/history.module';
ConfigModule.forRoot();

@Module({
    imports: [
        TrafficModule,
        WeatherModule,
        HistoryModule,
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.HOST,
            port: parseInt(<string>process.env.PORT),
            username: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
})
export class AppModule {}
