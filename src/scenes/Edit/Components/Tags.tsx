import * as React from 'react'

import './tags.css'
import useDreams from '../../../store/store';
import { Tag, isTag } from '../../../store/tags';
import TagInput from './TagInput';
import { AutocompleteChangeReason } from '@mui/material';


export default function Tags() {
    const getTags = useDreams(state => state.getTags)
    const addTagToDream = useDreams(state => state.addTag)
    const removeTagFromDream = useDreams(state => state.removeTag)
    const suggestions = useDreams(state => state.tags)
    const dreamTags = useDreams(state => state.dream.tags)

    React.useEffect(() => {
        getTags()
    }, [])


    const handleChange = async (_: React.SyntheticEvent<Element, Event>, values: (string | Tag | null)[], changeReason: AutocompleteChangeReason) => {
        const newValue = values.at(-1)
        console.log(changeReason, values)
        if (changeReason == 'createOption' && typeof (newValue) == 'string') {
            addTagToDream(newValue)
        } else if (changeReason == 'selectOption' && isTag(newValue)) {
            addTagToDream(newValue.title)
        } else {
            alert("Invalid handleChange:" + changeReason + newValue)
        }
    }

    const handleDelete = async (tag: Tag) => {
        await removeTagFromDream(tag.id)
    }

    const getValue = (option: string | Tag): string => {
        if (typeof (option) == 'string') {
            return option
        } else if (isTag(option)) {
            return option.title
        }
        else {
            alert("getValue failed")
            return ""
        }
    }

    return (
        <TagInput
            label='Kategorien'
            options={suggestions}
            values={dreamTags}
            getValue={getValue}
            onChange={handleChange}
            onDelete={handleDelete}

        />
    )
}