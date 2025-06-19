import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { TagCloud } from 'react-tagcloud'

import useDreams from '../../../store/store'
import { StatisticToggleOptions } from '../Statistics'



export default function Tags(props: {
    type: StatisticToggleOptions
}) {
    const getStatistics = useDreams(state => state.getStatistics)
    const categoryCounts = useDreams(state => state.categoriesCount)
    const personsCount = useDreams(state => state.personsCount)
    const persons = useDreams(state => state.persons)
    const categories = useDreams(state => state.categories)

    useEffect(() => {
        getStatistics()
    }, [])

    const count = props.type == 'person' ? personsCount : categoryCounts
    const names = props.type == 'person' ? persons : categories

    const tags = count.map(s => {
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