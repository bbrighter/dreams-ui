import * as React from 'react'
import styled from '@emotion/styled'
import { TagCloud } from 'react-tagcloud'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import PeopleIcon from '@mui/icons-material/People';

import { Statistic } from '../../../store/statistics'
import useDreams from '../../../store/store'


const StyledTagCloud = styled(TagCloud)`
    position: relative;
    width: 80%;
    left: 10%;
`

export default function Tags(props: {
    type: 'person' | 'category'
    statistics: Array<Statistic>
}) {
    const persons = useDreams(state => state.persons)
    const categories = useDreams(state => state.categories)

    const header = props.type == 'person' ? "Personen" : "Kategorien"
    const names = props.type == 'person' ? persons : categories

    const tags = props.statistics.map(s => {
        const name = names.find(n => n.id == s.id)?.name || ""
        return { key: s.id.toString(), value: name, count: s.count }
    })

    return (
        <>
            <Divider sx={{ mt: '1rem' }} />
            <Typography> {header}</Typography>
            <StyledTagCloud
                maxSize={50}
                minSize={14}
                tags={tags}
            />
        </>
    )
}