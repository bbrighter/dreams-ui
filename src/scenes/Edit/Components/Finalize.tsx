import Button from "@mui/material/Button";
import useDreams from "../../../store/store";
import { useState } from "react";

export default function FinalizeButton() {
    const finalizeDream = useDreams(state => state.finalizeDream)
    const finalized = useDreams(state => state.dream.finalized)

    const [isLoading, setIsLoading] = useState(false)


    const finalize = async () => {
        setIsLoading(true)
        finalizeDream().finally(() => setIsLoading(false))
    }



    return (
        <Button
            variant="contained"
            loading={isLoading}
            onClick={finalize}
            color="success"
            disabled={finalized}
        >
            Redigieren
        </Button>
    )
}