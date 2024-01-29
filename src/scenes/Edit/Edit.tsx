import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, TextField } from '@mui/material'
import debounce from 'lodash.debounce'

import useDream from '../../store/dream'
import Header from './Components/Header';
import RecordText from './Components/RecordText';
import Tags from './Components/Tags';


const DEBOUNCE_TIME = 5_000

const debouncedSave = (func: () => void) => debounce(func, DEBOUNCE_TIME)

export default function Edit() {
    const dreamStore = useDream()
    const { id: urlId } = useParams()
    const isSaved = dreamStore.isSaved

    React.useEffect(() => {
        if (urlId) {
            dreamStore.get(urlId)
        } else {
            alert("No url Id found")
        }
    }, [])

    const saveDream = async () => {
        if (isSaved) {
            await dreamStore.update()
        }
    }

    const onChangeDescriptionDebounce = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = e.currentTarget.value
        dreamStore.setDescription(value)
        debouncedSave(saveDream)()
    }

    return (
        <Container >
            <Box component='form'>
                <Header isSaved={isSaved} />
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