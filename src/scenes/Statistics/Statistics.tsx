import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'

import { IncludeParam } from '../../store/persons'
import useDreams from '../../store/store'
import Header from '../Components/Header'
import Navigation from '../Components/Navigation'
import { BackButton } from '../Edit/Components/EditHeader'
import MonthlyChart from './Components/MonthlyChart'
import StatisticsToggleOption from './Components/StatisticsToggleOption'
import Tags from './Components/Tags'

export type StatisticToggleOptions = 'person' | 'category'

export default function Statistics() {
    const getCategories = useDreams(state => state.getCategories)
    const getPersons = useDreams(state => state.getPersons)
    const getDreams = useDreams(state => state.getDreams)
    const categories = useDreams(state => state.categories)
    const persons = useDreams(state => state.persons)

    const [selectedOption, setSelectedOption] = useState<StatisticToggleOptions>('person')
    const onChangeToggleOption = (_, v: StatisticToggleOptions) => { setSelectedOption(v) }

    useEffect(() => {
        getDreams(IncludeParam.ALL)
        if (categories.length == 0) {
            getCategories()
        }
        if (persons.length == 0) {
            getPersons()
        }
    }, [])


    return (
        <>
            <Header mainAction={<BackButton />} />
            <Container sx={{ padding: '2rem' }}>
                <StatisticsToggleOption value={selectedOption} onChange={onChangeToggleOption} />
                <Tags type={selectedOption} />
                <MonthlyChart type={selectedOption} />
                <Navigation activeIndex={1} />
            </Container>
        </>

    )
}