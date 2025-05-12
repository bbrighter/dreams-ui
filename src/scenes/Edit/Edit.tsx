import { Box, Container, TextField } from '@mui/material'
import debounce from 'lodash.debounce'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

import useDreams from '../../store/store'
import Categories from './Components/Categories';
import EditHeader from './Components/EditHeader';
import Persons from './Components/Persons'
import RecordText from './Components/RecordText';


const DEBOUNCE_TIME = 5_000

const debouncedSave = (func: () => void) => debounce(func, DEBOUNCE_TIME)

export default function Edit() {
    const setDescription = useDreams(state => state.setDescription)
    const getDream = useDreams(state => state.getDream)
    const getPrivateDream = useDreams(state => state.getPrivateDream)
    const updateDream = useDreams(state => state.updateDream)
    const isSaved = useDreams(state => state.dream.isSaved)
    const description = useDreams(state => state.dream.description)
    const isValidPassword = useDreams(state => state.isValidPassword)()
    const { id: urlId } = useParams()

    useEffect(() => {
        if (urlId) {
            if (isValidPassword) {
                getPrivateDream(urlId)
            } else {
                getDream(urlId)
            }
        } else {
            alert('No url Id found')
        }
    }, [])

    const saveDream = async () => {
        if (isSaved) {
            await updateDream()
        }
    }

    const onChangeDescriptionDebounce = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = e.currentTarget.value
        setDescription(value)
        debouncedSave(saveDream)()
    }

    return (
        <>
            <EditHeader isSaved={isSaved} />
            <Container >
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
            </Container>
        </>
    )
}