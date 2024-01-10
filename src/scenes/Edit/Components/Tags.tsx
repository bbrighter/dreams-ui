import * as React from 'react'

import './tags.css'
import useTags from '../../../store/tags';
import useDream from '../../../store/dream';
import { WithContext as ReactTags, Tag } from 'react-tag-input';

export default function Tags() {
    const tagsStore = useTags()
    const suggestions = tagsStore.tags
    const tags = useDream(state => state.tags)
    const dreamId = useDream(state => state.id)
    const addTagToDream = useDream(state => state.addTag)
    const removeTagFromDream = useDream(state => state.removeTag)

    const [doUpdateTags, setDoUpdateTags] = React.useState(true)

    React.useEffect(() => {
        if (doUpdateTags) {
            tagsStore.getTags()
            setDoUpdateTags(false)
        }
    }, [doUpdateTags])

    const tagsToReactTags = (tags: Array<{ id: number, title: string }>): Array<Tag> => {
        return tags.map(t => ({ id: t.id.toString(), text: t.title }))
    }

    const handleAddition = async (tag: { id: string, text: string }) => {
        await tagsStore.addTag(dreamId, tag.text)
        addTagToDream(dreamId, tag.text)
        setDoUpdateTags(true)
    }

    const handleDelete = async (i: number) => {
        const deleteTagId = tags[i].id
        const ok = await tagsStore.removeTag(dreamId, deleteTagId)
        if (ok) {
            removeTagFromDream(deleteTagId)
            setDoUpdateTags(true)
        }
    }

    console.log('suggestions', suggestions)
    console.log('tags', tags)

    return (
        <ReactTags
            tags={tagsToReactTags(tags)}
            suggestions={tagsToReactTags(suggestions)}
            handleAddition={handleAddition}
            handleDelete={handleDelete}
            allowDragDrop={false}
            autocomplete={true}
            inputFieldPosition='bottom'
        />
    )
}