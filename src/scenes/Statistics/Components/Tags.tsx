import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { TagCloud } from 'react-tagcloud'

import { useDreams } from '../../../store'
import { StatisticToggleOptions } from './types'

export default function Tags(props: {
    type: StatisticToggleOptions
}) {
    const { getStatistics, categoriesCount, personsCount, persons, categories } = useDreams()

    useEffect(() => {
        getStatistics()
    }, [])

    const count = props.type == 'person' ? personsCount : categoriesCount
    const names = props.type == 'person' ? persons : categories

    const tags = count.map((s) => {
        const name = names.find(n => n.id == s.id)?.name || ''
        return { key: s.id.toString(), value: name, count: s.count }
    })

    return (
        <Box sx={{ position: 'relative', width: '80%', left: '10%', mt: '1rem', mb: '1rem' }}>
            <TagCloud
              maxSize={50}
              minSize={10}
              tags={tags}
            />
        </Box>
    )
}
