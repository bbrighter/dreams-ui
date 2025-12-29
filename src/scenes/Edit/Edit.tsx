import { Box, Container, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetDreams } from '../../hooks/loadDreams'
import { useSimpleDebounce } from '../../hooks/simpleDebounce'
import { dreamService, useDreams } from '../../store'
import Categories from './Components/Categories'
import EditFooter from './Components/EditFooter'
import EditHeader from './Components/EditHeader'
import Persons from './Components/Persons'
import RecordText from './Components/RecordText'

const DEBOUNCE_TIME = 2_000

export default function Edit() {
  const navigate = useNavigate()
  const { dream, setDescription } = useDreams()
  const { isSaved, description, transcript } = dream
  const { id: urlId } = useParams()

  useGetDreams()

  useEffect(() => {
    const numericId = Number(urlId)
    if (!urlId || isNaN(numericId)) {
      navigate('/')
      return
    }
    dreamService.getDream(numericId).catch((err) => {
      if (err.status == 404) {
        navigate('/')
        return
      }
    })
  }, [urlId])

  const debouncedSave = useSimpleDebounce(async () => {
    if (!isSaved) {
      await dreamService.patchDreamDescription()
    }
  }, DEBOUNCE_TIME)

  const onChangeDescriptionDebounce = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = e.currentTarget.value
    setDescription(value)
    debouncedSave()
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <EditHeader />
      <Container sx={{ marginBottom: '1rem', flexGrow: 1 }} component="form">
        <RecordText />
        <TextField
          sx={{
            width: '100%',
            marginTop: '1rem',
            height: '80%',
          }}
          label="Beschreibung"
          multiline
          minRows={5}
          maxRows={18}
          value={description + transcript}
          onChange={onChangeDescriptionDebounce}
        />
        <Categories />
        <Persons />
      </Container>
      <EditFooter />
    </Box>
  )
}
