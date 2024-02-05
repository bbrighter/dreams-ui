import * as React from 'react'
import { Autocomplete, AutocompleteChangeReason, Chip, TextField } from "@mui/material";
import { isPerson } from '../../../store/persons';
import { isTag } from '../../../store/tags';

export default function TagInput<T>(props: {
    label: string,
    values: Array<T>,
    options: Array<T>,
    getValue: (option: T | string) => string,
    onChange: (event: React.SyntheticEvent, value: (T | string | null)[], reason: AutocompleteChangeReason) => void,
    onDelete: (option: T) => void,
}) {
    const getKey = (option: T): number => {
        return isTag(option) || isPerson(option) ? option.id : -1
    }
    const getLabel = (option: T): string => {
        return isTag(option) ? option.title : isPerson(option) ? option.name : ""
    }

    return (
        <Autocomplete
            sx={{
                padding: '10px',
                width: '50%',
                display: 'inline-block',
            }}
            disablePortal
            value={props.values}
            onChange={props.onChange}
            freeSolo
            multiple
            disableClearable
            options={props.options}
            clearOnBlur
            getOptionLabel={props.getValue}
            renderTags={(value: T[]) =>
                value.map(option =>
                (<Chip
                    key={getKey(option)}
                    variant='outlined'
                    label={getLabel(option)}
                    onDelete={() => props.onDelete(option)}
                />)
                )
            }
            renderInput={params => (
                <TextField
                    {...params}
                    label={props.label}
                />
            )}
        />
    )
}

