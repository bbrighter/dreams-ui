import * as React from "react"
import { useEffect } from "react";
import { AppBar, Button, Container, List, Toolbar } from "@mui/material";


import DreamItem from "./Compenents/DreamItem";
import { useNavigateToDream } from "../../hooks/navigate";
import useDreams from "../../store/store";
import Navigation from "../Components/Navigation";
import Authentication from "./Authentication";


export default function Start() {
    const getDreams = useDreams(state => state.getDreams)
    const createDream = useDreams(state => state.createDream)
    const dreams = useDreams(state => state.dreams)
    const isValidPassword = useDreams(state => state.isValidPassword())

    const navigate = useNavigateToDream()


    useEffect(() => {
        getDreams().catch(e => alert(e))
    }, [isValidPassword])

    const handleClick = async () => {
        const dreamId = await createDream()
        navigate(dreamId)
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Button
                        variant='contained'
                        onClick={handleClick}
                    >
                        Neu
                    </Button>
                    <Authentication />
                </Toolbar>
            </AppBar >
            <Container sx={{ pt: '1rem' }}>

                <List>
                    {dreams.map(d =>
                        (<DreamItem key={d.id} date={d.date} id={d.id} />)
                    )}
                </List>
                <Navigation activeIndex={0} />
            </Container>
        </>
    )
}