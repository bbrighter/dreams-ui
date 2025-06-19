import { Box, Container, TextField } from '@mui/material'
import debounce from 'lodash.debounce'
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import useDreams from '../../store/store'
import Categories from './Components/Categories';
import EditHeader from './Components/EditHeader';
import FinalizeButton from './Components/FinalizeButton';
import Persons from './Components/Persons'
import RecordText from './Components/RecordText';


const DEBOUNCE_TIME = 5_000


export default function Edit() {
    const navigate = useNavigate()

    const setDescription = useDreams(state => state.setDescription)
    const getDream = useDreams(state => state.getDream)
    const updateDream = useDreams(state => state.updateDream)
    const isSaved = useDreams(state => state.dream.isSaved)
    const description = useDreams(state => state.dream.description)
    const { id: urlId } = useParams()

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

    const saveDream = useCallback(async () => {
        if (!isSaved) {
            await updateDream()
        }
    }, [isSaved, updateDream])

    const debouncedSave = useMemo(() => debounce(saveDream, DEBOUNCE_TIME), [saveDream])

    useEffect(() => {
        return () => {
            debouncedSave.cancel()
        }
    }, [debouncedSave])

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
                        value={description}
                        onChange={onChangeDescriptionDebounce}
                    />
                    <Categories />
                    <Persons />
                </Box>
                <FinalizeButton />
            </Container>
        </>
    )
}