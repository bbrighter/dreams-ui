import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Input, TextField } from '@mui/material'

import useDream from '../../store/dream'
import SaveButton from './Components/SaveButton'
import BackButton from './Components/BackButton'


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

    const onChangeDate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dreamStore.setDate(e.currentTarget.value)
    }
    const onChangeDesription = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dreamStore.setDescription(e.currentTarget.value)
    }


    return (
        <Container sx={{ mt: '1rem' }}>
            <Box component='form'>
                <BackButton />
                <Input
                    sx={{
                        position: 'absolute',
                        width: '140px',
                        left: 'calc(50vw - 70px)'
                    }}
                    type='date'
                    value={dreamStore.date.toISOString().substring(0, 10)}
                    onChange={onChangeDate}
                />
                <SaveButton />
                <TextField
                    sx={{
                        width: '100%',
                        marginTop: '2rem'
                    }}
                    label="Beschreibung"
                    multiline
                    minRows={20}
                    value={dreamStore.description}
                    onChange={onChangeDesription}
                />
            </Box>
        </Container>
    )
}