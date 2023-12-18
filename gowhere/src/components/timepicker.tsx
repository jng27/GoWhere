import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as TimeField } from '@mui/x-date-pickers/TimePicker';
import { dateTimePicker } from './types';

export default function TimePicker(props: dateTimePicker) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField {...props} ampm={false} />
        </LocalizationProvider>
    );
}
