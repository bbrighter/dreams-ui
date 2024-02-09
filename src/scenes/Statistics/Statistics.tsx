import * as React from 'react'
import { TagCloud } from 'react-tagcloud'

import useDreams from '../../store/store'
import { Container } from '@mui/material'
import styled from '@emotion/styled'
import Navigation from '../Components/Navigation'

const StyledTagCloud = styled(TagCloud)`
    position: relative;
    width: 80%;
    left: 10%;
`


export default function Statistics() {
    const getStatistics = useDreams(state => state.getStatistics)
    const getCategories = useDreams(state => state.getCategories)
    const statistics = useDreams(state => state.statistics)
    const categories = useDreams(state => state.categories)

    React.useEffect(() => {
        getStatistics()
        if (categories.length == 0) {
            getCategories()
        }
    }, [])

    const namedStatistics = statistics.map(s => {
        const name = categories.find(c => c.id == s.categoryId)?.name
        return { key: s.categoryId.toString(), value: name || "", count: s.count }
    })

    return (
        <>
            <Container>
                <StyledTagCloud
                    maxSize={50}
                    minSize={14}
                    tags={namedStatistics}
                />
                <Navigation activeIndex={1} />
            </Container>
        </>

    )
}