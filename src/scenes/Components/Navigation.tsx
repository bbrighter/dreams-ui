import QueryStatsIcon from '@mui/icons-material/QueryStats'
import SettingsIcon from '@mui/icons-material/Settings'
import TableViewIcon from '@mui/icons-material/TableView'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { useState } from 'react'

import { useNavigateHomePage, useNavigateStatistics, useNavigateToManagement } from '../../hooks/navigate'

export default function Navigation(props: {
    activeIndex: number
}) {
    const [activeTab, setActiveTab] = useState(props.activeIndex)
    const goToHome = useNavigateHomePage()
    const goToStatistics = useNavigateStatistics()
    const goToManagement = useNavigateToManagement()

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
        switch (newValue) {
            case 0:
                goToHome()
                break
            case 1:
                goToStatistics()
                break
            case 2:
                goToManagement()
                break
            default:
                alert('Huch! ' + newValue)
        }
    }

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}>
            <BottomNavigation showLabels value={activeTab} onChange={handleChange}>
                <BottomNavigationAction label="Übersicht" icon={<TableViewIcon />} />
                <BottomNavigationAction label="Auswertung" icon={<QueryStatsIcon />} />
                <BottomNavigationAction label="Management" icon={<SettingsIcon />} />
            </BottomNavigation>
        </Paper>
    )
}
