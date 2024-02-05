import * as React from 'react'
import { WithContext as ReactTags, Tag } from 'react-tag-input';

import './tags.css'
import useDreams from '../../../store/store';


export default function Tags() {
    const getTags = useDreams(state => state.getTags)
    const addTagToDream = useDreams(state => state.addTag)
    const removeTagFromDream = useDreams(state => state.removeTag)
    const suggestions = useDreams(state => state.tags)
    const dreamTags = useDreams(state => state.dream.tags)

    React.useEffect(() => {
        getTags()
    }, [])


    const tagsToReactTags = (tags: Array<{ id: number, title: string }>): Array<Tag> => {
        return tags.map(t => ({ id: t.id.toString(), text: t.title }))
    }

    const handleAddition = async (tag: { id: string, text: string }) => {
        await addTagToDream(tag.text)
    }

    const handleDelete = async (i: number) => {
        const deleteTagId = dreamTags[i].id
        await removeTagFromDream(deleteTagId)
    }

    return (
        <>

            <ReactTags
                tags={tagsToReactTags(dreamTags)}
                suggestions={tagsToReactTags(suggestions)}
                handleAddition={handleAddition}
                handleDelete={handleDelete}
                allowDragDrop={false}
                autocomplete={true}
                inputFieldPosition='bottom'
                allowDeleteFromEmptyInput={false}
                autofocus={false}
            />
        </>
    )
}