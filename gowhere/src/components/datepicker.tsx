import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';

interface datePickerProps {
    id: string;
    name: string;
    onChange?: (value: Date | null | undefined) => void;
    defaultValue?: any;
    variant: 'filled' | 'outlined' | 'standard' | undefined;
    inputProps?: any;
    error?: boolean;
    helperText?: any;
    fullWidth?: boolean;
    style?: any;
}

export default function DatePicker(props: datePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField {...props} format='DD-MM-YYYY' />
        </LocalizationProvider>
    );
}
