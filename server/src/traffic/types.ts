export interface TrafficApiResponse {
    items: [
        {
            update_timestamp: string;
            cameras: Array<Camera>;
        },
    ];
    api_info: {
        status: string;
    };
}

export interface Camera {
    timestamp: string;
    image: string;
    location: {
        latitude: number;
        longitude: number;
    };
    camera_id: string;
}
