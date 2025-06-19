import { Button, Container, List } from '@mui/material';
import { useEffect } from 'react';

import { useNavigateToDream } from '../../hooks/navigate';
import useDreams from '../../store/store';
import Header from '../Components/Header';
import Navigation from '../Components/Navigation';
import DreamItem from './Components/DreamItem';


export default function Start() {
    const getDreams = useDreams(state => state.getDreams)
    const loggedIn = useDreams(state => state.loggedIn)
    const createDream = useDreams(state => state.createDream)
    const dreams = useDreams(state => state.dreams)
    const scrollPosition = useDreams(state => state.scrollPosition)
    const setScrollPosition = useDreams(state => state.setScrollPosition)

    const navigate = useNavigateToDream()

    useEffect(() => {
        window.scrollTo(0, scrollPosition)
    }, [])



    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        getDreams().catch(e => alert(e))
    }, [loggedIn])

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
            <Container sx={{ pt: '1rem', pb: '3rem' }}>
                <List>
                    {dreams.map(d =>
                        (<DreamItem key={d.id} date={d.date} id={d.id} visible={d.visible} finalized={d.finalized} />),
                    )}
                </List>
                <Navigation activeIndex={0} />
            </Container>
        </>
    )
}