import * as React from 'react'
import { Autocomplete, AutocompleteChangeReason, Chip, TextField } from "@mui/material";

import { TagValue } from './tagValues';


export default function TagInputs(props: {
    type: 'Person' | 'Tag'
    values: Array<TagValue>,
    options: Array<TagValue>,
    onChange: (event: React.SyntheticEvent, value: (TagValue | string | null)[], reason: AutocompleteChangeReason) => void,
    onDelete: (option: TagValue) => void,
}) {
    const inputLabel = props.type == 'Person' ? 'Beteiligte Personen' : 'Kategorien'

    const getValue = (option: TagValue | string): string => {
        return typeof (option) == 'string' ? option : option.label
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
            onChange={props.onChange}
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
                    label={option.label}
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

