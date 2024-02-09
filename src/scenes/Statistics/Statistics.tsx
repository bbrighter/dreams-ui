import * as React from 'react'
import { TagCloud } from 'react-tagcloud'

import useDreams from '../../store/store'
import { Container, Divider, Typography } from '@mui/material'
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
    const getPersons = useDreams(state => state.getPersons)
    const categoryCounts = useDreams(state => state.categoriesCount)
    const personsCount = useDreams(state => state.personsCount)
    const categories = useDreams(state => state.categories)
    const persons = useDreams(state => state.persons)

    React.useEffect(() => {
        getStatistics()
        if (categories.length == 0) {
            getCategories()
        }
        if (persons.length == 0) {
            getPersons()
        }
    }, [])

    const namedStatistics = categoryCounts.map(s => {
        const name = categories.find(c => c.id == s.id)?.name
        return { key: s.id.toString(), value: name || "", count: s.count }
    })

    const namedPersonsCount = personsCount.map(s => {
        const name = persons.find(c => c.id == s.id)?.name
        return { key: s.id.toString(), value: name || "", count: s.count }
    })

    return (
        <>
            <Container>
                <Typography>Kategorien</Typography>
                <StyledTagCloud
                    maxSize={50}
                    minSize={14}
                    tags={namedStatistics}
                />
                <Divider />
                <Typography>Personen</Typography>
                <StyledTagCloud
                    maxSize={50}
                    minSize={14}
                    tags={namedPersonsCount}
                />
                <Navigation activeIndex={1} />
            </Container>
        </>

    )
}