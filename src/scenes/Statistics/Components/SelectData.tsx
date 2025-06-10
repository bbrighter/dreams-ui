import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { StatisticToggleOptions } from '../Statistics';

export default function SelectData(props: {
    options: Array<{ id: number, name: string }>
    value: number
    onChange: (value: number) => void
    type: StatisticToggleOptions
}) {

    const options = props.options.slice().sort((a, b) => a.name.trim().localeCompare(b.name.trim()))

    return (
        <Select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            displayEmpty
        >
            <MenuItem value={0} key={0}>
                <em>Alle</em>
            </MenuItem>
            {options.map(o => (
                <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
            ))}
        </Select>
    )
}