import Rating from '@mui/material/Rating'
import { useEffect, useState } from 'react'

import { dreamService, useDreams } from '../../../store'

export default function DreamRating() {
  const rating = useDreams(state => state.dream.rating)
  const [value, setValue] = useState<number | null>(rating)

  const onChange = (_: React.SyntheticEvent, v: number | null) => {
    if (v != null) {
      setValue(v)
      dreamService.patchDreamRating(v)
    }
  }

  useEffect(() => {
    setValue(rating)
  }, [rating])

  return (
    <Rating
      title="Bewertung"
      value={value}
      onChange={onChange}
    />
  )
}
