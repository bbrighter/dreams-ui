import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'

import { IncludeParams } from '../../store/categories/categories'
import useDreams from '../../store/store'
import Bar from '../Components/Bar'
import Navigation from '../Components/Navigation'
import { BackButton } from '../Edit/Components/EditHeader'
import MonthlyChart from './Components/MonthlyChart'
import StatisticsToggleOption from './Components/StatisticsToggleOption'
import Tags from './Components/Tags'

export type StatisticToggleOptions = 'person' | 'category'

export default function Statistics() {
    const getCategories = useDreams(state => state.getCategories)
    const getDreams = useDreams(state => state.getDreams)
    const loggedIn = useDreams(state => state.loggedIn)

    const [selectedOption, setSelectedOption] = useState<StatisticToggleOptions>('person')
    const onChangeToggleOption = (_, v: StatisticToggleOptions) => {
        setSelectedOption(v)
     }

    useEffect(() => {
        getDreams(IncludeParams.ALL)
        getCategories()
    }, [loggedIn])

    return (
        <>
            <Bar mainAction={<BackButton />} position="top" showAuth />
            <Container sx={{ padding: '2rem' }}>
                <StatisticsToggleOption value={selectedOption} onChange={onChangeToggleOption} />
                <Tags type={selectedOption} />
                <MonthlyChart type={selectedOption} />
                <Navigation activeIndex={1} />
            </Container>
        </>

    )
}
