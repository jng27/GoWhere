import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { dateTimePicker } from './types';

export default function DatePicker(props: dateTimePicker) {
    const date = new Date();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField {...props} format='DD-MM-YYYY' />
        </LocalizationProvider>
    );
}
