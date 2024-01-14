import * as React from "react"
import { useEffect } from "react";
import { Button, Container, List } from "@mui/material";

import useDreams from "../../store/dreams";
import useDream from "../../store/dream";
import DreamItem from "./Compenents/DreamItem";
import { useNavigateToDream } from "../../hooks/navigate";


export default function Start() {
    const dreamsStore = useDreams()
    const createDream = useDream(state => state.create)
    const navigate = useNavigateToDream()


    useEffect(() => {
        dreamsStore.get().catch(
            e => alert(e)
        )
    }, [])

    const handleClick = async () => {
        const dreamId = await createDream()
        navigate(dreamId)
    }

    return (
        <Container sx={{ pt: '1rem' }}>
            <Button
                variant='contained'
                onClick={handleClick}
            >
                Neu
            </Button>
            <List>
                {dreamsStore.dreams.map(d =>
                    (<DreamItem key={d.id} date={d.date} id={d.id} />)
                )}
            </List>
        </Container>
    )
}