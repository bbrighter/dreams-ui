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
    const getDreams = useDreams(state => state.getDreams)

    const [selectedOption, setSelectedOption] = useState<StatisticToggleOptions>('person')
    const onChangeToggleOption = (_, v: StatisticToggleOptions) => { setSelectedOption(v) }

    useEffect(() => {
        getDreams(IncludeParam.ALL)
        getCategories()
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