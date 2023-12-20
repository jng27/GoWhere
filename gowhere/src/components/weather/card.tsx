import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { WeatherForecast } from '../../views/types';
import AirIcon from '@mui/icons-material/Air';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import './card.css';

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
                    height: 250,
                },
            }}
        >
            <Paper {...props}>
                <div style={{ padding: 10 }}>
                    <p
                        id='card-p'
                        style={{
                            fontWeight: 700,
                            fontSize: 16,
                            textDecoration: 'underline',
                        }}
                    >
                        Weather Forecast
                    </p>
                    <p id='card-p'>
                        <CloudOutlinedIcon />
                        <span id='card-span'> {forecast.forecast}</span>
                    </p>
                    <p id='card-p'>
                        <InvertColorsIcon />
                        <span id='card-span'>
                            {JSON.stringify(forecast.relative_humidity.low)} -{' '}
                            {JSON.stringify(forecast.relative_humidity.high)}
                        </span>
                    </p>
                    <p id='card-p'>
                        <DeviceThermostatIcon />
                        <span id='card-span'>
                            {' '}
                            {JSON.stringify(forecast.temperature.low)} °C -{' '}
                            {JSON.stringify(forecast.temperature.high)} °C
                        </span>
                    </p>
                    <p id='card-p'>
                        <AirIcon />
                        <span id='card-span'>{forecast.wind.direction}, </span>
                        <span id='card-span'>
                            {JSON.stringify(forecast.wind.speed.low)} m/s -{' '}
                            {JSON.stringify(forecast.wind.speed.high)} m/s
                        </span>
                    </p>
                </div>
            </Paper>
        </Box>
    );
}
