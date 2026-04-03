import Button from "@mui/material/Button"

import { useNavigateToDream } from "../../../hooks/navigate"
import { dreamsService } from "../../../store"

export const AddDreamButton = () => {
  const navigate = useNavigateToDream()

  const handleClick = async () => {
    const dreamId = await dreamsService.postDream()
    navigate(dreamId)
  }

  return (
    <Button variant="contained" onClick={handleClick}>
      Neu
    </Button>
  )
}