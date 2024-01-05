import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import SaveIcon from '@mui/icons-material/Save'

import { DreamRequestBody } from '../../../store/interface'
import useDream from '../../../store/dream'
import { dreamURL } from '../../../store/url'
import { useNavigate } from 'react-router-dom'


export default function SaveButton() {
    const dreamStore = useDream()
    const navigate = useNavigate()

    const saveDream = async () => {
        const body: DreamRequestBody = {
            date: dreamStore.date.toISOString(),
            description: dreamStore.description,
        }
        const url = dreamURL(dreamStore.id)
        const init: RequestInit = {
            body: JSON.stringify(body),
            method: 'PATCH',
        }
        const resp = await fetch(url, init)
        if (resp.ok) {
            navigate('/')
        }
    }

    return (
        <IconButton
            sx={{
                float: 'right'
            }}
            color='success'
            onClick={saveDream}
        >
            <SaveIcon />
        </IconButton>
    )
}