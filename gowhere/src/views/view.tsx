import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import DateForm from '../forms/form';
import DatePicker from '../components/datepicker';

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
                            onSubmit={() => {}}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col style={{ width: '60%' }}>
                        <DatePicker
                            id='startdate'
                            name='startdate'
                            variant='outlined'
                        />
                    </Col>
                    <Col style={{ width: '30%' }}>
                        <Row>
                            <Col>
                                <DatePicker
                                    id='startdate'
                                    name='startdate'
                                    variant='outlined'
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col style={{ width: '60%' }}>
                        <DatePicker
                            id='startdate'
                            name='startdate'
                            variant='outlined'
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default View;
