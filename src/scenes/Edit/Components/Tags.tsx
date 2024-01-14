import * as React from 'react'
import { WithContext as ReactTags, Tag } from 'react-tag-input';

import './tags.css'
import useTags from '../../../store/tags';
import useDream from '../../../store/dream';


export default function Tags() {
    const [newTagText, setNewTagText] = React.useState<string | boolean>(false)
    const tagsStore = useTags()
    const suggestions = tagsStore.tags
    const dreamTags = useDream(state => state.tags)
    const dreamId = useDream(state => state.id)
    const addTagToDream = useDream(state => state.addTag)
    const removeTagFromDream = useDream(state => state.removeTag)


    React.useEffect(() => {
        tagsStore.getTags()
    }, [])

    React.useEffect(() => {
        if (newTagText) {
            const newTag = suggestions.find(t => t.title == newTagText)
            if (newTag) {
                addTagToDream(newTag)
            }
            setNewTagText(false)
        }
    }, [suggestions, newTagText])

    const tagsToReactTags = (tags: Array<{ id: number, title: string }>): Array<Tag> => {
        return tags.map(t => ({ id: t.id.toString(), text: t.title }))
    }

    const handleAddition = async (tag: { id: string, text: string }) => {
        await tagsStore.addTag(dreamId, tag.text)
        setNewTagText(tag.text)
    }

    const handleDelete = async (i: number) => {
        const deleteTagId = dreamTags[i].id
        const ok = await tagsStore.removeTag(dreamId, deleteTagId)
        if (ok) {
            removeTagFromDream(deleteTagId)
        }
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