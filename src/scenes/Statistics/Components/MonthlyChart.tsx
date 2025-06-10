import Box from '@mui/material/Box'
import { BarChart } from '@mui/x-charts'
import { eachMonthOfInterval, format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'

import useDreams from '../../../store/store'
import { StatisticToggleOptions } from '../Statistics'
import SelectData from './SelectData'


type PivotedData = {
    month: string
    date: Date
    selected: number
    unselected: number
}

export default function MonthlyChart(props: {
    type: StatisticToggleOptions
}) {
    const dreams = useDreams(state => state.dreams)
    const categories = useDreams(state => state.categories)
    const persons = useDreams(state => state.persons)

    const [selectedId, setSelectedId] = useState(0)
    useEffect(() => { setSelectedId(0) }, [props.type])

    const data: Array<{ id: number, name: string }> = useMemo(() =>
        props.type == 'person' ? persons : categories,
        [props.type, persons, categories])

    const label = useMemo(() => data.find(d => d.id == selectedId)?.name || 'Alle',
        [selectedId, props.type])

    const series = useMemo(() => {
        const series = [{ dataKey: 'selected', label: label, stack: 'all', color: '#0b22f7' }]
        if (data.some(d => d.id == selectedId)) {
            series.push({ dataKey: 'unselected', label: 'Sonstige', stack: 'all', color: '#9c9c9c' })
        }
        return series
    }, [selectedId, props.type])

    const dataset = useMemo(() => {
        if (dreams.length == 0) return
        if (data.length == 0) return

        const allMonths = eachMonthOfInterval({ start: dreams[0].date, end: dreams[dreams.length - 1].date })
        return allMonths
            .map(m => {
                const monthlyDreams = dreams.filter(d => d.date.getFullYear() == m.getFullYear() && d.date.getMonth() == m.getMonth())
                const result: PivotedData = monthlyDreams.reduce((acc, item) => {
                    const data = props.type == 'person' ? item.persons : item.categories
                    const isSelected = selectedId == 0 ? true : data.some(d => d.id == selectedId)
                    return {
                        ...acc,
                        selected: acc.selected + (isSelected ? 1 : 0),
                        unselected: acc.unselected + (isSelected ? 0 : 1),
                    }
                }, { selected: 0, unselected: 0, month: format(m, 'MM/yyyy'), date: m } as PivotedData)
                return result
            })
            .sort((a, b) => a.date.getTime() - b.date.getTime())
    }, [dreams, data, selectedId, props.type])

    return (
        <Box sx={{ pt: '2rem' }}>
            <SelectData
                type={props.type}
                options={data}
                value={selectedId}
                onChange={setSelectedId}

            />
            {dataset &&
                <BarChart
                    sx={{ height: '400px' }}
                    dataset={dataset}
                    xAxis={[{ dataKey: 'month', label: 'Datum' }]}
                    series={series}
                />}
        </Box>
    )
}