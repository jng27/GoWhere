import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import DateForm from '../forms/form';
import DatePicker from '../components/datepicker';
import dayjs from 'dayjs';
import Traffic from '../models/traffic';
import Weather from '../models/weather';
import {
    TrafficApiResponse,
    WeatherApiResponse,
    Camera,
    WeatherForecast,
} from './types';
import AutoComplete from '../components/traffic/autocomplete';

const trafficApi = new Traffic();
const weatherApi = new Weather();

function View() {
    const [traffic, setTraffic] = useState([]);
    const [camera, setCamera] = useState<Camera>();
    const [weather, setWeather] = useState<WeatherForecast>();

    const handleDatePicker = async (values) => {
        const parsed = dayjs(values);
        if (parsed && !isNaN(parsed.valueOf())) {
            const formatted = parsed.format('YYYY-MM-DD[T]HH:mm:ss');
            //query traffic
            await trafficApi.GetTrafficByDatetime(
                formatted,
                (result: TrafficApiResponse, err) => {
                    if (result && result.items && !err) {
                        const items = result.items[0];
                        if (items instanceof Array && Array.length > 0) {
                            const cameras = items.cameras;
                            setTraffic(cameras);
                        }
                    }
                },
            );
        }
    };

    const handleAutoComplete = async (value: Camera) => {
        setCamera(value);
    };

    useEffect(() => {
        const getTraffic = async () => {
            await trafficApi.GetTraffic((result: TrafficApiResponse, err) => {
                if (result && !err) {
                    const cameras = result.items[0].cameras;
                    setTraffic(cameras);
                }
            });
        };
        getTraffic();
    }, []);

    useEffect(() => {
        console.log(traffic);
    }, [traffic]);

    useEffect(() => {
        console.log(weather);
    }, [weather]);

    useEffect(() => {
        if (camera) {
            //get the timestamp from selected traffic and query weather
            const getWeather = async () => {
                await weatherApi.GetWeatherByDatetime(
                    camera.timestamp,
                    (result: WeatherApiResponse, err) => {
                        if (result && result.items && !err) {
                            const items = result.items;
                            if (items instanceof Array && Array.length > 0) {
                                setWeather(items[0]);
                            }
                        }
                    },
                );
            };
            getWeather();
        }
    }, [camera]);

    return (
        <Row>
            <Col>
                <Row>
                    <span
                        style={{
                            display: 'flex',
                            alignSelf: 'flex-start',
                            fontSize: '24px',
                            fontWeight: 700,
                        }}
                    >
                        Simple Traffic And Weather Application
                    </span>
                </Row>
                <Row>
                    <Col style={{ width: '60%' }}>
                        <DateForm
                            initialValues={{
                                startDate: null,
                                enddate: null,
                            }}
                            handleChange={() => handleDatePicker}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col style={{ width: '60%' }} className='right-padding'>
                        <AutoComplete
                            options={traffic}
                            handleChange={handleAutoComplete}
                        />
                        <DatePicker
                            id='startdate'
                            name='startdate'
                            style={{ marginTop: '50px' }}
                        />
                    </Col>
                    <Col style={{ width: '30%' }}>
                        <Row>
                            <Col>
                                <DatePicker id='startdate' name='startdate' />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default View;
