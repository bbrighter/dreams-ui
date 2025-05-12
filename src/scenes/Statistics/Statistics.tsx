import Container from '@mui/material/Container'
import { useEffect } from 'react'

import useDreams from '../../store/store'
import Header from '../Components/Header'
import Navigation from '../Components/Navigation'
import { BackButton } from '../Edit/Components/EditHeader'
import Tags from './Components/Tags'

export default function Statistics() {
    const getStatistics = useDreams(state => state.getStatistics)
    const getCategories = useDreams(state => state.getCategories)
    const getPersons = useDreams(state => state.getPersons)
    const categoryCounts = useDreams(state => state.categoriesCount)
    const personsCount = useDreams(state => state.personsCount)
    const categories = useDreams(state => state.categories)
    const persons = useDreams(state => state.persons)
    const isValidPassword = useDreams(state => state.isValidPassword())

    useEffect(() => {
        getStatistics(isValidPassword)
        if (categories.length == 0) {
            getCategories()
        }
        if (persons.length == 0) {
            getPersons()
        }
    }, [isValidPassword])

    return (
        <>
            <Header
                mainAction={<BackButton />}

            />
            <Container sx={{ padding: '0rem' }}>
                <Tags
                    type='category'
                    statistics={categoryCounts}
                />
                <Tags
                    type='person'
                    statistics={personsCount}
                />
                <Navigation activeIndex={1} />
            </Container>
        </>

    )
}