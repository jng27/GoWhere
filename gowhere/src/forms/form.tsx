import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import style from '../style/style';
import './form.css';
import DatePicker from '../components/datepicker';
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
function DateForm({ initialValues, onSubmit }): React.JSX.Element {
    var formValues = {
        startdate: initialValues.startdate || null,
        enddate: initialValues.enddate || null,
    };
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
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
                                    Start Date
                                    <span className='asterisks'>*</span>
                                </label>
                                <DatePicker
                                    id='startdate'
                                    name='startdate'
                                    onChange={handleChange}
                                    defaultValue={formValues.startdate}
                                    variant='outlined'
                                    inputProps={style.propsForTextFieldInput}
                                    error={
                                        (touched.startdate &&
                                            errors.startdate) !== undefined
                                    }
                                    helperText={
                                        touched.startdate && errors.startdate
                                    }
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
                                    End Date
                                    <span className='asterisks'>*</span>
                                </label>
                                <DatePicker
                                    id='enddate'
                                    name='enddate'
                                    onChange={handleChange}
                                    defaultValue={formValues.enddate}
                                    variant='outlined'
                                    inputProps={style.propsForTextFieldInput}
                                    error={
                                        (touched.enddate && errors.enddate) !==
                                        undefined
                                    }
                                    helperText={
                                        touched.enddate && errors.enddate
                                    }
                                ></DatePicker>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
}
export default DateForm;
