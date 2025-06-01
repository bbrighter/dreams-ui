import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { TagCloud } from 'react-tagcloud'

import { Statistic } from '../../../store/statistics'
import useDreams from '../../../store/store'



export default function Tags(props: {
    type: 'person' | 'category'
    statistics: Array<Statistic>
}) {
    const persons = useDreams(state => state.persons)
    const categories = useDreams(state => state.categories)

    const header = props.type == 'person' ? 'Personen' : 'Kategorien'
    const names = props.type == 'person' ? persons : categories

    const tags = props.statistics.map(s => {
        const name = names.find(n => n.id == s.id)?.name || ''
        return { key: s.id.toString(), value: name, count: s.count }
    })

    return (
        <>
            <Divider sx={{ mt: '1rem' }} />
            <Typography> {header}</Typography>
            <Box sx={{ position: 'relative', width: '80%', left: '10%' }}>
                <TagCloud
                    maxSize={50}
                    minSize={10}
                    tags={tags}
                />
            </Box>

        </>
    )
}