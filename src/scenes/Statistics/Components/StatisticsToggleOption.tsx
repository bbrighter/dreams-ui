import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import { StatisticToggleOptions } from './types'

export default function StatisticsToggleOption(props: {
  onChange: (e: React.MouseEvent<HTMLElement>, v: StatisticToggleOptions) => void
  value: StatisticToggleOptions
}) {
  const onChange = (e: React.MouseEvent<HTMLElement>, v: StatisticToggleOptions) => {
    props.onChange(e, v)
  }

  return (
    <ToggleButtonGroup
      value={props.value}
      exclusive
      onChange={onChange}
    >
      <ToggleButton value="person">
        Personen
      </ToggleButton>
      <ToggleButton value="category">
        Kategorien
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
