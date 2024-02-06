import * as React from 'react'
import { AutocompleteChangeReason } from '@mui/material';

import useDreams from '../../../store/store';
import TagInputs from './TagInputs';
import { TagValue, isTagValue, tagsToTagValue } from './tagValues';


export default function Tags() {
    const getTags = useDreams(state => state.getTags)
    const addTagToDream = useDreams(state => state.addTag)
    const removeTagFromDream = useDreams(state => state.removeTag)
    const suggestions = useDreams(state => state.tags)
    const dreamTags = useDreams(state => state.dream.tags)

    React.useEffect(() => {
        getTags()
    }, [])


    const handleChange = async (_: React.SyntheticEvent<Element, Event>, values: (string | TagValue | null)[], changeReason: AutocompleteChangeReason) => {
        const newValue = values.at(-1)
        if (changeReason == 'createOption' && typeof (newValue) == 'string') {
            addTagToDream(newValue)
        } else if (changeReason == 'selectOption' && isTagValue(newValue)) {
            addTagToDream(newValue.label)
        } else {
            alert("Invalid handleChange:" + changeReason + newValue)
        }
    }

    const handleDelete = async (tag: TagValue) => {
        await removeTagFromDream(tag.id)
    }

    return (
        <TagInputs
            type='Tag'
            options={tagsToTagValue(suggestions)}
            values={tagsToTagValue(dreamTags)}
            onChange={handleChange}
            onDelete={handleDelete}
        />
    )
}