import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './form.css';
import DatePicker from '../components/datepicker';
import TimePicker from '../components/timepicker';
import dayjs from 'dayjs';

/*
initialValues : Object?
onSubmit : 
*/
const errorMessagesForm = {
    startdate: 'Start date is required',
    endddate: 'End date is required',
};

const validationSchema = Yup.object().shape({
    startdate: Yup.date()
        .max(new Date())
        .typeError(errorMessagesForm.startdate)
        .required(errorMessagesForm.startdate),
    endddate: Yup.date()
        .max(new Date())
        .typeError(errorMessagesForm.endddate)
        .required(errorMessagesForm.endddate),
});
function DateForm({ initialValues, handleChange }): React.JSX.Element {
    var formValues = {
        startdate: initialValues.startdate || null,
        enddate: initialValues.enddate || null,
        time: initialValues.time || null,
    };
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={formValues}
            onSubmit={() => {}}
        >
            {({
                values,
                errors,
                touched,
                // handleChange, # We will be handling onChange through custom function instead of using formik built-in function
                setFieldValue,
                handleSubmit,
                isSubmitting,
            }) => (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col className='right-padding'>
                            <Form.Group
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <label
                                    id='textfield'
                                    style={{ alignSelf: 'flex-start' }}
                                >
                                    Date
                                    <span className='asterisks'>*</span>
                                </label>
                                <DatePicker
                                    id='startdate'
                                    name='startdate'
                                    onChange={handleChange(values)}
                                    defaultValue={formValues.startdate}
                                ></DatePicker>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <label
                                    id='textfield'
                                    style={{ alignSelf: 'flex-start' }}
                                >
                                    Time
                                    <span className='asterisks'>*</span>
                                </label>
                                <TimePicker
                                    id='time'
                                    name='time'
                                    onChange={handleChange(values)}
                                    defaultValue={formValues.time}
                                ></TimePicker>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
}
export default DateForm;
