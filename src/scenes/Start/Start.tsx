import * as React from "react"
import { useEffect } from "react";
import { Button, Container, List } from "@mui/material";

import DreamItem from "./Compenents/DreamItem";
import { useNavigateToDream } from "../../hooks/navigate";
import useDreams from "../../store/store";


export default function Start() {
    const getDreams = useDreams(state => state.getDreams)
    const createDream = useDreams(state => state.createDream)
    const dreams = useDreams(state => state.dreams)

    const navigate = useNavigateToDream()


    useEffect(() => {
        getDreams().catch(e => alert(e))
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
                {dreams.map(d =>
                    (<DreamItem key={d.id} date={d.date} id={d.id} />)
                )}
            </List>
        </Container>
    )
}