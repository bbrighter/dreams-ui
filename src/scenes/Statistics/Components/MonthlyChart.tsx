import { BarChart } from '@mui/x-charts'
import { eachMonthOfInterval, format } from 'date-fns'
import { useEffect, useState } from 'react'

import useDreams from '../../../store/store'
import { StatisticToggleOptions } from '../Statistics'


type ValuesPerId = Record<string, number>
type PivotedData = ValuesPerId & {
    month: string
    date: Date
}

export default function MonthlyChart(props: {
    type: StatisticToggleOptions
}) {
    const dreams = useDreams(state => state.dreams)
    const categories = useDreams(state => state.categories)
    const persons = useDreams(state => state.persons)

    const data: Array<{ id: number, name: string }> = props.type == 'person' ? persons : categories
    const [dataset, setDataset] = useState<PivotedData[]>([])
    const [series, setSeries] = useState<Array<{ dataKey: string, label: string, stack: string }>>([])


    useEffect(() => {
        if (dreams.length == 0) return
        if (data.length == 0) return

        const results = [] as Array<PivotedData>
        const allMonths = eachMonthOfInterval({ start: dreams[0].date, end: dreams[dreams.length - 1].date })
        allMonths.forEach(m => {
            const monthlyResult = { month: format(m, 'MM/yyyy'), date: m }
            const monthlyDreams = dreams.filter(d => d.date.getFullYear() == m.getFullYear() && d.date.getMonth() == m.getMonth())
            data.forEach(dat => {
                monthlyResult[String(dat.id)] = monthlyDreams.reduce((sum, dream) => {
                    const dreamData = props.type == 'person' ? dream.persons : dream.categories
                    const idExists = dreamData.findIndex(dc => dc.id == dat.id) > -1
                    if (idExists) {
                        sum += 1
                    }
                    return sum
                }, 0)
            })
            results.push(monthlyResult as PivotedData)
        })
        setDataset(results.sort((a, b) => a.date.getTime() - b.date.getTime()))
        setSeries(data.map(c => ({ dataKey: String(c.id), label: c.name, stack: 'all' })))

    }, [dreams, categories, persons, data])


    return (
        <BarChart
            sx={{ height: '400px' }}
            dataset={dataset}
            xAxis={[{ dataKey: 'month', label: 'Datum' }]}
            series={series}
        />
    )
}