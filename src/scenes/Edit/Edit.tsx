import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, TextField } from '@mui/material'
import debounce from 'lodash.debounce'

import Header from './Components/Header';
import RecordText from './Components/RecordText';
import Categories from './Components/Categories';
import Persons from './Components/Persons'
import useDreams from '../../store/store'


const DEBOUNCE_TIME = 5_000

const debouncedSave = (func: () => void) => debounce(func, DEBOUNCE_TIME)

export default function Edit() {
    const setDescription = useDreams(state => state.setDescription)
    const getDream = useDreams(state => state.getDream)
    const updateDream = useDreams(state => state.updateDream)
    const isSaved = useDreams(state => state.dream.isSaved)
    const description = useDreams(state => state.dream.description)
    const { id: urlId } = useParams()

    React.useEffect(() => {
        if (urlId) {
            getDream(urlId)
        } else {
            alert("No url Id found")
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
            <Header isSaved={isSaved} />
            <Container >
                <Box component='form'>
                    <RecordText />
                    <TextField
                        sx={{
                            width: '100%',
                            marginTop: '6rem'
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