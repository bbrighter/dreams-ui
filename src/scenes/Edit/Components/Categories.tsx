import { useEffect } from 'react'

import { categoriesService, dreamService, useDreams } from '../../../store'
import TagInputs from './TagInputs'
import { categoriesToTagValue, TagValue } from './tagValues'

export default function Categories() {
    const { categories, dream } = useDreams()
    const dreamTags = dream.categories

    useEffect(() => {
      categoriesService.list()
    }, [])

    const handleSave = (name: string) => {
      dreamService.addCategoryToDream(name)
     }

    const handleDelete = (tag: TagValue) => {
      dreamService.removeCategoryFromDream(tag.id)
     }

    return (
        <TagInputs
          type="Category"
          options={categoriesToTagValue(categories)}
          values={categoriesToTagValue(dreamTags)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
    )
}
