import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import DateForm from '../forms/form';
import DatePicker from '../components/datepicker';
import dayjs from 'dayjs';

function handleChange(values) {
    const parsed = dayjs(values);
    if (parsed && !isNaN(parsed.valueOf())) {
        const formatted = parsed.format('YYYY-MM-DD[T]HH:mm:ss');
        console.log(formatted);
        //query backend
    }
}

function View() {
    useEffect(() => {}, []);

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
                        Simple Weather Forecast Application
                    </span>
                </Row>
                <Row>
                    <Col style={{ width: '60%' }}>
                        <DateForm
                            initialValues={{
                                startDate: null,
                                enddate: null,
                            }}
                            handleChange={() => handleChange}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col style={{ width: '60%' }} className='right-padding'>
                        <DatePicker id='startdate' name='startdate' />
                    </Col>
                    <Col style={{ width: '30%' }}>
                        <Row>
                            <Col>
                                <DatePicker id='startdate' name='startdate' />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col style={{ width: '60%' }}>
                        <DatePicker id='startdate' name='startdate' />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default View;
