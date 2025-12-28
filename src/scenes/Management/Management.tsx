import Container from '@mui/material/Container'
import List from '@mui/material/List'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useEffect, useState } from 'react'

import { categoriesService, useDreams } from '../../store'
import Navigation from '../Components/Navigation'
import ManagementList from './ManagementList'

export default function Management() {
    const { categories, persons } = useDreams()

    useEffect(() => {
        categoriesService.list('dreamsCount')
    }, [])

    const [tab, setTab] = useState(0)

    return (
        <Container sx={{ padding: 1 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                <Tab label="Kategorien" />
                <Tab label="Personen" />
            </Tabs>
            <List>
                <ManagementList listItems={tab === 0 ? categories : persons} />
            </List>
            <Navigation activeIndex={2} />
        </Container>
    )
}
