import * as React from 'react'

import useDreams from '../../../store/store';
import TagInputs from './TagInputs';
import { TagValue, categoriesToTagValue } from './tagValues';


export default function Categories() {
    const getCategories = useDreams(state => state.getCategories)
    const addCategoryToDream = useDreams(state => state.addCategory)
    const removeCategoryFromDream = useDreams(state => state.removeCategory)
    const suggestions = useDreams(state => state.tags)
    const dreamTags = useDreams(state => state.dream.categories)

    React.useEffect(() => {
        getCategories()
    }, [])

    const handleSave = (name: string) => { addCategoryToDream(name) }

    const handleDelete = (tag: TagValue) => { removeCategoryFromDream(tag.id) }

    return (
        <TagInputs
            type='Category'
            options={categoriesToTagValue(suggestions)}
            values={categoriesToTagValue(dreamTags)}
            onSave={handleSave}
            onDelete={handleDelete}
        />
    )
}