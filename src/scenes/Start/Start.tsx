import * as React from "react"
import { useEffect } from "react";
import { Button, Container, List } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useDreams from "../../store/dreams";
import useDream from "../../store/dream";
import DreamItem from "./Compenents/DreamItem";


export default function Start() {
    const dreamsStore = useDreams()
    const createDream = useDream(state => state.create)
    const navigate = useNavigate()

    useEffect(() => {
        dreamsStore.get().catch(
            e => alert(e)
        )
    }, [])

    const navigateTo = (dreamId: number) => {
        navigate('/dreams/' + dreamId)
    }

    const handleClick = async () => {
        const dreamId = await createDream()
        navigateTo(dreamId)
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