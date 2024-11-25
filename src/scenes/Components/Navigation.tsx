import * as React from "react"
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import TableViewIcon from "@mui/icons-material/TableView";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useNavigateHomePage, useNavigateStatistics } from "../../hooks/navigate";


export default function Navigation(props: {
    activeIndex: number
}) {
    const [activeTab, setActiveTab] = React.useState(props.activeIndex)
    const goToHome = useNavigateHomePage()
    const goToStatistics = useNavigateStatistics()

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
        if (newValue == 0) {
            goToHome()
        } else if (newValue == 1) {
            goToStatistics()
        } else {
            alert("Huch! " + newValue)
        }
    }

    return (
        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }} >
            <BottomNavigation showLabels value={activeTab} onChange={handleChange}>
                <BottomNavigationAction label="Übersicht" icon={<TableViewIcon />} />
                <BottomNavigationAction label="Auswertung" icon={<QueryStatsIcon />} />
            </BottomNavigation>
        </Paper>
    )
}