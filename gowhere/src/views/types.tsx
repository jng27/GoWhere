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
    general: object;
    periods: [];
}
