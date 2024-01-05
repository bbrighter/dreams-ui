import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, TextField } from '@mui/material'

import useDream from '../../store/dream'
import Header from './Components/Header';
import RecordText from './Components/RecordText';


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

    const onChangeDesription = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dreamStore.setDescription(e.currentTarget.value)
    }


    return (
        <Container >
            <Box component='form'>
                <Header />
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
                    onChange={onChangeDesription}
                />
            </Box>
        </Container>
    )
}