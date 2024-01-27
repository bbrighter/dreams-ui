import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, TextField } from '@mui/material'
import debounce from 'lodash.debounce'

import useDream, { updateDream } from '../../store/dream'
import Header from './Components/Header';
import RecordText from './Components/RecordText';
import Tags from './Components/Tags';


const DEBOUNCE_TIME = 5_000

const saveDream = async (dreamId: number, dreamDate: Date, dreamDescription: string) => {
    const ok = await updateDream(dreamId, dreamDate, dreamDescription)
    console.log('saved')
    if (!ok) {
        alert("not ok")
    }
}

const debouncedSave = debounce(saveDream, DEBOUNCE_TIME)


export default function Edit() {
    const dreamStore = useDream()
    const { id: urlId } = useParams()

    React.useEffect(() => {
        if (urlId) {
            dreamStore.get(urlId)
        } else {
            alert("No url Id found")
        }
    }, [])

    const onChangeDescriptionDebounce = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = e.currentTarget.value
        dreamStore.setDescription(value)
        debouncedSave(dreamStore.id, dreamStore.date, dreamStore.description)
    }

    return (
        <Container >
            <Box component='form'>
                <Header />
                <Tags />
                <RecordText />
                <TextField
                    sx={{
                        width: '100%',
                        marginTop: '2rem'
                    }}
                    label="Beschreibung"
                    multiline
                    minRows={20}
                    value={dreamStore.description}
                    onChange={onChangeDescriptionDebounce}
                />
            </Box>
        </Container>
    )
}