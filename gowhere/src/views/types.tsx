export interface TrafficApiResponse {
    items: [
        {
            update_timestamp: string;
            cameras: [];
        },
    ];
    api_info: {
        status: string;
    };
}

export interface WeatherApiResponse {
    items: Array<WeatherForecast>;
    api_info: {
        status: string;
    };
}

export interface Camera {
    timestamp: string;
    image: string;
    location: object;
    camera_id: string;
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
