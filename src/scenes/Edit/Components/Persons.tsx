import * as React from 'react'
import { Autocomplete, AutocompleteChangeReason, Chip, TextField } from '@mui/material'

import useDreams from '../../../store/store'
import { Person, isPerson } from '../../../store/persons'
import TagInput from './TagInput'


export default function Persons() {
    const addPerson = useDreams(state => state.addPerson)
    const removePerson = useDreams(state => state.removePerson)
    const usedPersons = useDreams(state => state.dream.persons)

    const getPersons = useDreams(state => state.getPersons)
    const personSuggestions = useDreams(state => state.persons)


    React.useEffect(() => {
        getPersons().catch(e => alert(e))
    }, [])

    const handleChange = async (_: React.SyntheticEvent<Element, Event>, values: (string | Person | null)[], changeReason: AutocompleteChangeReason) => {
        const newValue = values.at(-1)
        console.log(changeReason, values)
        if (changeReason == 'createOption' && typeof (newValue) == 'string') {
            addPerson(newValue)
        } else if (changeReason == 'selectOption' && isPerson(newValue)) {
            addPerson(newValue.name)
        } else {
            alert("Invalid handleChange:" + changeReason + newValue)
        }
    }

    const getValue = (option: string | Person): string => {
        if (typeof (option) == 'string') {
            return option
        } else if (isPerson(option)) {
            return option.name
        } else {
            alert("getValue failed")
            return ""
        }
    }

    const handleDelete = async (person: Person) => {
        await removePerson(person.id)
    }

    return (
        <TagInput<Person>
            label='Beteiligte Personen'
            values={usedPersons}
            options={personSuggestions}
            onChange={handleChange}
            onDelete={handleDelete}
            getValue={getValue}
        />
    )
}