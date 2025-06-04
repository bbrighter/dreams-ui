import { Button, Container, List } from '@mui/material';
import { useEffect } from 'react';

import { useNavigateToDream } from '../../hooks/navigate';
import useDreams from '../../store/store';
import Header from '../Components/Header';
import Navigation from '../Components/Navigation';
import DreamItem from './Components/DreamItem';


export default function Start() {
    const getDreams = useDreams(state => state.getDreams)
    const getPrivateDreams = useDreams(state => state.getPrivateDreams)
    const createDream = useDreams(state => state.createDream)
    const dreams = useDreams(state => state.dreams)
    const isValidPassword = useDreams(state => state.isValidPassword())
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
                        (<DreamItem key={d.id} date={d.date} id={d.id} visible={d.visible} finalized={d.finalized} />),
                    )}
                </List>
                <Navigation activeIndex={0} />
            </Container>
        </>
    )
}