import { Button, Container, List } from '@mui/material'
import { useEffect } from 'react'

import { useGetDreams } from '../../hooks/loadDreams'
import { useNavigateToDream } from '../../hooks/navigate'
import { dreamsService, useDreams } from '../../store'
import Bar from '../Components/Bar'
import Navigation from '../Components/Navigation'
import DreamItem from './Components/DreamItem'

export default function Start() {
  const { dreams, scrollPosition, setScrollPosition } = useDreams()

  const navigate = useNavigateToDream()

  useGetDreams()

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

  const handleClick = async () => {
    const dreamId = await dreamsService.postDream()
    navigate(dreamId)
  }

  const MainAction
    = (
      <Button variant="contained" onClick={handleClick}>
        Neu
      </Button>
    )

  return (
    <>
      <Bar mainAction={MainAction} position="top" showAuth />
      <Container sx={{ pt: '1rem', pb: '3rem' }}>
        <List>
          {dreams.map(d =>
            (<DreamItem key={d.id} dream={d} />),
          )}
        </List>
        <Navigation activeIndex={0} />
      </Container>
    </>
  )
}
