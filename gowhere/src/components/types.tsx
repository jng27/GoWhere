export interface dateTimePicker {
    id: string;
    name: string;
    onChange?: (value: Date | null | undefined) => void;
    defaultValue?: any;
    error?: boolean;
    helperText?: any;
    fullWidth?: boolean;
    style?: any;
}
