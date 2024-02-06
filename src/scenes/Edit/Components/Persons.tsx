import * as React from 'react'
import { AutocompleteChangeReason } from '@mui/material'

import useDreams from '../../../store/store'
import TagInputs from './TagInputs'
import { TagValue, isTagValue, personsToTagValue } from './tagValues'


export default function Persons() {
    const addPerson = useDreams(state => state.addPerson)
    const removePerson = useDreams(state => state.removePerson)
    const usedPersons = useDreams(state => state.dream.persons)

    const getPersons = useDreams(state => state.getPersons)
    const personSuggestions = useDreams(state => state.persons)


    React.useEffect(() => {
        getPersons().catch(e => alert(e))
    }, [])

    const handleChange = async (_: React.SyntheticEvent<Element, Event>, values: (string | TagValue | null)[], changeReason: AutocompleteChangeReason) => {
        const newValue = values.at(-1)
        if (changeReason == 'createOption' && typeof (newValue) == 'string') {
            addPerson(newValue)
        } else if (changeReason == 'selectOption' && isTagValue(newValue)) {
            addPerson(newValue.label)
        } else {
            alert("Invalid handleChange:" + changeReason + newValue)
        }
    }

    const handleDelete = async (person: TagValue) => {
        await removePerson(person.id)
    }

    return (
        <TagInputs
            type='Person'
            values={personsToTagValue(usedPersons)}
            options={personsToTagValue(personSuggestions)}
            onChange={handleChange}
            onDelete={handleDelete}
        />
    )
}