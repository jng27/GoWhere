import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Camera } from '../../views/types';

type props = {
    options: Array<Camera>;
    handleChange: Function;
};

function transformString(data: any) {
    const stringified = JSON.stringify(data);
    return stringified.replace(/[\{\}\"']+/g, '');
}

export default function AutoComplete(props: props) {
    const [defaultValue, setDefaultValue] = useState<Camera>();
    const [filteredCameras, setFilteredCameras] = useState();
    const [cameras, setCameras] = useState<Array<Camera>>();
    const options = props.options;
    const handleChange = props.handleChange;
    let transformedData;

    if (options) {
        transformedData = Object.values(options).map((option) => {
            return option.location;
        });

        if (options && JSON.stringify(options) !== JSON.stringify(cameras)) {
            setFilteredCameras(transformedData);
            setCameras(options);
        }
        if (!filteredCameras) setFilteredCameras(transformedData);
        if (!cameras) setCameras(options);
    }

    useEffect(() => {
        if (cameras && defaultValue) {
            const filtered = Object.entries(cameras).find(
                ([key, value]) => defaultValue.camera_id === value.camera_id,
            );
            if (
                filtered &&
                JSON.stringify(filtered[1]) !== JSON.stringify(defaultValue)
            ) {
                setDefaultValue(filtered[1]);
                handleChange(filtered[1]);
            }
        }
    }, [cameras]);

    return (
        <Autocomplete
            disablePortal={true}
            id='autocomplete'
            defaultValue={null}
            value={defaultValue && defaultValue.location}
            // inputValue={defaultValue && transformString(defaultValue.location)}
            options={filteredCameras || []}
            getOptionLabel={(option) => {
                return transformString(option);
            }}
            isOptionEqualToValue={(option, value) =>
                //isOptionEqualToValue: to overwrite deep equality by mui
                JSON.stringify(option) === JSON.stringify(value)
            }
            // onInputChange={(_, newInputValue) => {
            //     if (cameras) {
            //         const selected = Object.entries(cameras).find(
            //             ([key, value]) =>
            //                 transformString(value.location) === newInputValue,
            //         );
            //         if (selected) {
            //             console.log('fired');
            //             handleChange(selected[1]);
            //             setDefaultValue(selected[1]);
            //         }
            //     }
            // }}
            onChange={(event: any, newValue: any | null) => {
                if (cameras) {
                    const selected = Object.entries(cameras).find(
                        ([_, value]) =>
                            JSON.stringify(value.location) ===
                            JSON.stringify(newValue),
                    );
                    if (selected) {
                        handleChange(selected[1]);
                        setDefaultValue(selected[1]);
                    }
                }
            }}
            renderInput={(params) => (
                <TextField {...params} label='Locations' />
            )}
        />
    );
}
