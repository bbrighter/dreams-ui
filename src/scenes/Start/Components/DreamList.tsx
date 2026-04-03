import List from "@mui/material/List"
import { useEffect } from "react"

import { dreamsService, useFilteredDreams } from "../../../store"
import { DreamItem } from "./DreamItem"

export const DreamList = () => {
  const dreams = useFilteredDreams()

  useEffect(() => {
    dreamsService.getDreams()
  }, [])

  return (
    <List>
      {dreams.map(d =>
        (<DreamItem key={d.id} dream={d} />),
      )}
    </List>
  )
}