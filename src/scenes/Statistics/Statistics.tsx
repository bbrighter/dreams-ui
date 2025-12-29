import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'

import { categoriesService, dreamsService, IncludeParams, selectLoggedIn, useDreams } from '../../store'
import Bar from '../Components/Bar'
import Navigation from '../Components/Navigation'
import { BackButton } from '../Edit/Components/EditHeader'
import MonthlyChart from './Components/MonthlyChart'
import StatisticsToggleOption from './Components/StatisticsToggleOption'
import Tags from './Components/Tags'
import { StatisticToggleOptions } from './Components/types'

export default function Statistics() {
  const loggedIn = useDreams(selectLoggedIn)

  const [selectedOption, setSelectedOption] = useState<StatisticToggleOptions>('person')
  const onChangeToggleOption = (_, v: StatisticToggleOptions) => {
    setSelectedOption(v)
  }

  useEffect(() => {
    dreamsService.getDreams(IncludeParams.ALL)
    categoriesService.list()
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
