import { Box, Container, TextField } from '@mui/material'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import { useGetDreams } from '../../hooks/loadDreams';
import { useSimpleDebounce } from '../../hooks/simpleDebounce';
import useDreams from '../../store/store'
import Categories from './Components/Categories';
import DreamRating from './Components/DreamRating';
import EditHeader from './Components/EditHeader';
import FinalizeButton from './Components/FinalizeButton';
import Persons from './Components/Persons'
import RecordText from './Components/RecordText';


const DEBOUNCE_TIME = 5_000


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
    }, [])

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
        <>
            <EditHeader isSaved={isSaved} />
            <Container sx={{ marginBottom: '1rem' }}>
                <Box component='form'>
                    <RecordText />
                    <TextField
                        sx={{
                            width: '100%',
                            marginTop: '1rem',
                        }}
                        label="Beschreibung"
                        multiline
                        minRows={20}
                        value={description + transcript}
                        onChange={onChangeDescriptionDebounce}
                    />
                    <Categories />
                    <Persons />
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                }}>
                    <DreamRating />
                    <FinalizeButton />

                </Box>
            </Container>
        </>
    )
}