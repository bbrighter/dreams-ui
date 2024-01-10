import * as React from 'react'
import { IconButton, Input, Toolbar } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useDream, { updateDream } from '../../../store/dream';
import { useNavigateHomePage } from '../../../hooks/navigate';

export default function Header() {
    const date = useDream(state => state.date)
    const setDate = useDream(state => state.setDate)
    const onChangeDate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDate(e.currentTarget.value)
    }

    return (
        <Toolbar>
            <BackButton />
            <Input
                sx={{
                    position: 'absolute',
                    width: '140px',
                    left: 'calc(50% - 140px/2)'
                }}
                type='date'
                value={date.toISOString().substring(0, 10)}
                onChange={onChangeDate}
            />
            <SaveButton />
        </Toolbar>
    )
}

function SaveButton() {
    const dreamStore = useDream()
    const navigate = useNavigateHomePage()

    const saveDream = async () => {
        const ok = await updateDream(dreamStore.id, dreamStore.date, dreamStore.description)
        if (ok) {
            navigate()
        }
    }

    return (
        <IconButton
            sx={{
                position: 'absolute',
                right: 0
            }}

            color='success'
            onClick={saveDream}
        >
            <SaveIcon />
        </IconButton>
    )
}

function BackButton() {
    const navigate = useNavigateHomePage()
    const goBack = () => {
        navigate()
    }

    return (
        <IconButton
            sx={{
                position: 'absolute',
                left: 0
            }}
            onClick={goBack}
        >
            <ArrowBackIcon />
        </IconButton>
    )
}