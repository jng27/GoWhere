import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { WeatherForecast } from '../../views/types';
// import AirOutlinedIcon from '@mui/icons-material/AirOutlined';

interface props {
    elevation: number;
    style?: any;
    weather: WeatherForecast;
}

export default function Card(props: props) {
    const forecast = props.weather.general;
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 250,
                    height: 400,
                },
            }}
        >
            <Paper {...props}>
                <div style={{ padding: 10 }}>
                    <p>Forecast: {forecast.forecast}</p>
                    <p>
                        Humidity:{' '}
                        {JSON.stringify(forecast.relative_humidity.low)} -{' '}
                        {JSON.stringify(forecast.relative_humidity.high)}
                    </p>
                    <p>
                        Temperature: {JSON.stringify(forecast.temperature.low)}{' '}
                        - {JSON.stringify(forecast.temperature.high)}
                    </p>
                    <p>Wind direction: {forecast.wind.direction}</p>
                    <p>
                        {/* <AirOutlinedIcon /> */}
                        {JSON.stringify(forecast.wind.speed.low)} -{' '}
                        {JSON.stringify(forecast.wind.speed.high)}
                    </p>
                </div>
            </Paper>
        </Box>
    );
}
