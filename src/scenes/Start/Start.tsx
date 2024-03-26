import * as React from "react"
import { useEffect } from "react";
import { Button, Container, List } from "@mui/material";


import DreamItem from "./Compenents/DreamItem";
import { useNavigateToDream } from "../../hooks/navigate";
import useDreams from "../../store/store";
import Navigation from "../Components/Navigation";
import Header from "../Components/Header";


export default function Start() {
    const getDreams = useDreams(state => state.getDreams)
    const getPrivateDreams = useDreams(state => state.getPrivateDreams)
    const createDream = useDreams(state => state.createDream)
    const dreams = useDreams(state => state.dreams)
    const isValidPassword = useDreams(state => state.isValidPassword())

    const navigate = useNavigateToDream()


    useEffect(() => {
        if (isValidPassword) {
            getPrivateDreams().catch(e => alert(e))
        } else {
            getDreams().catch(e => alert(e))
        }
    }, [isValidPassword])

    const handleClick = async () => {
        const dreamId = await createDream()
        navigate(dreamId)
    }

    const MainAction =
        <Button variant="contained" onClick={handleClick}>
            Neu
        </Button>

    return (
        <>
            <Header mainAction={MainAction} />
            <Container sx={{ pt: '1rem' }}>
                <List>
                    {dreams.map(d =>
                        (<DreamItem key={d.id} date={d.date} id={d.id} visible={d.visible} />)
                    )}
                </List>
                <Navigation activeIndex={0} />
            </Container>
        </>
    )
}