import * as React from "react"

import useDreams from "../../../store/store"
import TagInputs from "./TagInputs"
import { TagValue, personsToTagValue } from "./tagValues"


export default function Persons() {
    const getPersons = useDreams(state => state.getPersons)
    const addPerson = useDreams(state => state.addPerson)
    const removePerson = useDreams(state => state.removePerson)
    const usedPersons = useDreams(state => state.dream.persons)
    const personSuggestions = useDreams(state => state.persons)

    React.useEffect(() => {
        getPersons()
    }, [])

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