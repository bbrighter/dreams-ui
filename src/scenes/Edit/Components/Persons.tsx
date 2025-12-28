import { useEffect } from 'react'

import { categoriesService, dreamService, useDreams } from '../../../store'
import TagInputs from './TagInputs'
import { categoriesToTagValue, TagValue } from './tagValues'

export default function Persons() {
    const usedPersons = useDreams(state => state.dream.persons)
    const personSuggestions = useDreams(state => state.persons)

    useEffect(() => {
      categoriesService.list()
     }, [])

    const handleChange = (name: string) => dreamService.addPersonToDream(name)
    const handleDelete = (person: TagValue) => dreamService.removePersonFromDream(person.id)

    return (
        <TagInputs
          type="Person"
          values={categoriesToTagValue(usedPersons)}
          options={categoriesToTagValue(personSuggestions)}
          onSave={handleChange}
          onDelete={handleDelete}
        />
    )
}
