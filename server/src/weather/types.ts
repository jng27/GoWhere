export interface WeatherApiResponse {
    items: Array<WeatherForecast>;
    api_info: {
        status: string;
    };
}

export interface WeatherForecast {
    update_timestamp: string;
    timestamp: string;
    valid_period: object;
    general: {
        forecast: string;
        relative_humidity: {
            low: number;
            high: number;
        };
        temperature: {
            low: number;
            high: number;
        };
        wind: {
            direction: string;
            speed: { low: number; high: number };
        };
    };
    periods: [];
}
