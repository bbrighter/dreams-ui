import Rating from "@mui/material/Rating"

import { dreamService, useDreams } from "../../../../store"

export default function DreamRating() {
  const rating = useDreams(state => state.dream.rating)
  const setRating = useDreams(state => state.setRating)

  const onChange = (_: React.SyntheticEvent, v: number | null) => {
    if (v != null) {
      setRating(v)
      dreamService.saveDream()
    }
  }

  return (
    <Rating
      title="Bewertung"
      value={rating}
      onChange={onChange}
    />
  )
}
