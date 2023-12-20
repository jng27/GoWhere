import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Camera } from '../../views/types';

type props = {
    options: Array<Camera>;
    handleChange: Function;
};

export default function AutoComplete(props: props) {
    const options = props.options;
    const handleChange = props.handleChange;
    const transformedData = Object.values(options).map((option) => {
        return option.location;
    });

    return (
        <Autocomplete
            disablePortal={true}
            id='combo-box-demo'
            options={transformedData}
            getOptionLabel={(option) => {
                const stringified = JSON.stringify(option);
                return stringified.replace(/[\{\}\"']+/g, '');
            }}
            isOptionEqualToValue={(option, value) =>
                //isOptionEqualToValue: to overwrite deep equality by mui
                JSON.stringify(option) === JSON.stringify(value)
            }
            onChange={(event: any, newValue: any | null) => {
                const selected = Object.entries(options).find(
                    ([key, value]) =>
                        JSON.stringify(value.location) ===
                        JSON.stringify(newValue),
                );
                if (selected) {
                    handleChange(selected[1]);
                }
            }}
            renderInput={(params) => (
                <>
                    <TextField {...params} label='Locations' />
                </>
            )}
        />
    );
}
