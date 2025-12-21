import { Box, Container, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetDreams } from '../../hooks/loadDreams'
import { useSimpleDebounce } from '../../hooks/simpleDebounce'
import useDreams from '../../store/store'
import Categories from './Components/Categories'
import EditFooter from './Components/EditFooter'
import EditHeader from './Components/EditHeader'
import Persons from './Components/Persons'
import RecordText from './Components/RecordText'

const DEBOUNCE_TIME = 2_000

export default function Edit() {
    const navigate = useNavigate()

    const setDescription = useDreams(state => state.setDescription)
    const getDream = useDreams(state => state.getDream)
    const updateDescription = useDreams(state => state.updateDescription)
    const isSaved = useDreams(state => state.dream.isSaved)
    const description = useDreams(state => state.dream.description)
    const transcript = useDreams(state => state.dream.transcript)
    const { id: urlId } = useParams()

    useGetDreams()

    useEffect(() => {
        const numericId = Number(urlId)
        if (!urlId || isNaN(numericId)) {
            navigate('/')
            return
        }
        getDream(urlId).catch((err) => {
            if (err.status == 404) {
                navigate('/')
                return
            }
        })
    }, [urlId])

    const debouncedSave = useSimpleDebounce(async () => {
        if (!isSaved) {
            await updateDescription()
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
