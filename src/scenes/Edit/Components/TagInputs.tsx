import * as React from 'react'
import { Autocomplete, AutocompleteChangeReason, Chip, TextField } from "@mui/material";

import { TagValue, isTagValue } from './tagValues';


export default function TagInputs(props: {
    type: 'Person' | 'Category'
    values: Array<TagValue>,
    options: Array<TagValue>,
    onSave: (name: string) => void,
    onDelete: (option: TagValue) => void,
}) {
    const inputLabel = props.type == 'Person' ? 'Beteiligte Personen' : 'Kategorien'

    const getValue = (option: TagValue | string): string => {
        return typeof (option) == 'string' ? option : option.name
    }

    const onChange = (_: React.SyntheticEvent, values: (TagValue | string | null)[], changeReason: AutocompleteChangeReason) => {
        const newValue = values.at(-1)
        if (changeReason == 'createOption' && typeof (newValue) == 'string') {
            props.onSave(newValue)
        } else if (changeReason == 'selectOption' && isTagValue(newValue)) {
            props.onSave(newValue.name)
        } else {
            alert("Invalid handleChange:" + changeReason + newValue)
        }
    }

    const options = props.options.filter(o => !props.values.some(v => v.id == o.id))

    return (
        <Autocomplete
            sx={{
                paddingTop: '1rem',
                paddingBottom: '1rem',
            }}
            disablePortal
            value={props.values}
            onChange={onChange}
            freeSolo
            multiple
            disableClearable
            options={options}
            clearOnBlur
            getOptionLabel={getValue}
            renderTags={(value: TagValue[]) =>
                value.map(option =>
                (<Chip
                    key={option.id}
                    variant='outlined'
                    label={option.name}
                    onDelete={() => props.onDelete(option)}
                />)
                )
            }
            renderInput={params => (
                <TextField
                    {...params}
                    label={inputLabel}
                />
            )}
        />
    )
}

