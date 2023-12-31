import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import DateForm from '../forms/form';
import dayjs from 'dayjs';
import Traffic from '../models/traffic';
import Weather from '../models/weather';
import {
    TrafficApiResponse,
    WeatherApiResponse,
    Camera,
    WeatherForecast,
} from './types';
import AutoComplete, {
    transformString,
} from '../components/traffic/autocomplete';
import Card from '../components/weather/card';
import Image from 'mui-image';
import './view.css';
import History from '../models/history';

const trafficApi = new Traffic();
const weatherApi = new Weather();
const historyApi = new History();

function View() {
    const [traffic, setTraffic] = useState([]);
    const [camera, setCamera] = useState<Camera>();
    const [weather, setWeather] = useState<WeatherForecast>();
    const [datetime, setDateTime] = useState<number>();

    const handleDatePicker = async (values) => {
        const parsed = dayjs(values);
        if (parsed && !isNaN(parsed.valueOf())) {
            const formatted = parsed.format('YYYY-MM-DD[T]HH:mm:ss');
            //query traffic
            await trafficApi.GetTrafficByDatetime(
                formatted,
                (result: TrafficApiResponse, err) => {
                    if (result && result.items && !err) {
                        const items = result.items;
                        if (items instanceof Array && items.length > 0) {
                            const cameras = items[0].cameras;
                            setTraffic(cameras);
                            setDateTime(parsed.valueOf());
                        }
                    }
                },
            );
        }
    };

    const handleAutoComplete = async (value: Camera) => {
        setCamera(value);
        const dt = datetime || dayjs().valueOf();
        historyApi.PostQuery(
            dt,
            transformString(value.location),
            (res, err) => {
                console.log(res, err);
            },
        );
    };

    useEffect(() => {
        const getTraffic = async () => {
            await trafficApi.GetTraffic((result: TrafficApiResponse, err) => {
                if (result && !err) {
                    const items = result.items;
                    if (items instanceof Array && items.length > 0) {
                        const cameras = items[0].cameras;
                        setTraffic(cameras);
                    }
                }
            });
        };
        getTraffic();
    }, []);

    useEffect(() => {
        // console.log(traffic);
    }, [traffic]);

    useEffect(() => {
        // console.log(weather);
    }, [weather]);

    useEffect(() => {
        // console.log(camera);
        if (camera) {
            //get the timestamp from selected traffic and query weather
            const getWeather = async () => {
                await weatherApi.GetWeatherByDatetime(
                    camera.timestamp,
                    (result: WeatherApiResponse, err) => {
                        if (result && result.items && !err) {
                            const items = result.items;
                            if (items instanceof Array && items.length > 0) {
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
                    <Col id='custom-traffic-row'>
                        <DateForm
                            initialValues={{
                                startDate: null,
                                enddate: null,
                            }}
                            handleChange={() => handleDatePicker}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }} id='custom-wrapper'>
                    <Col className='right-padding' id='custom-traffic-row'>
                        <AutoComplete
                            options={traffic}
                            handleChange={handleAutoComplete}
                        />
                        <div style={{ marginTop: '20px' }}>
                            {camera && camera.image && (
                                <Image src={camera.image} />
                            )}
                        </div>
                    </Col>
                    <Col id='custom-weather-row'>
                        <Row>
                            <Col id='custom-weather-col'>
                                {weather && weather.general && (
                                    <Card
                                        elevation={3}
                                        style={{ marginTop: 0 }}
                                        weather={weather}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default View;
