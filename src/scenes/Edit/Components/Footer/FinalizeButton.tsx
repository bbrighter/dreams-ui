import Button from "@mui/material/Button"
import { useState } from "react"

import { dreamService, useDreams } from "../../../../store"

export default function FinalizeButton() {
  const finalized = useDreams(state => state.dream.finalized)
  const isRated = useDreams(state => state.dream.rating != null)

  const [isLoading, setIsLoading] = useState(false)

  const finalize = async () => {
    setIsLoading(true)
    await dreamService.finalize()
    setIsLoading(false)
  }

  return (
    <Button
      variant="contained"
      loading={isLoading}
      onClick={finalize}
      color="success"
      disabled={finalized || !isRated}
    >
      Redigieren
    </Button>
  )
}
