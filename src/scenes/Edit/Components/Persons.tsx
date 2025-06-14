import { useEffect } from 'react'

import useDreams from '../../../store/store'
import TagInputs from './TagInputs'
import { personsToTagValue, TagValue } from './tagValues'


export default function Persons() {
    const getCategories = useDreams(state => state.getCategories)
    const addPerson = useDreams(state => state.addPerson)
    const removePerson = useDreams(state => state.removePerson)
    const usedPersons = useDreams(state => state.dream.persons)
    const personSuggestions = useDreams(state => state.persons)

    useEffect(() => { getCategories() }, [])

    const handleChange = (name: string) => { addPerson(name) }

    const handleSave = (person: TagValue) => { removePerson(person.id) }

    return (
        <TagInputs
            type='Person'
            values={personsToTagValue(usedPersons)}
            options={personsToTagValue(personSuggestions)}
            onSave={handleChange}
            onDelete={handleSave}
        />
    )
}