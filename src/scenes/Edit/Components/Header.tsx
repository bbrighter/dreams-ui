import * as React from 'react'
import { IconButton, Input, Toolbar } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useDream from '../../../store/dream';
import { useNavigateHomePage } from '../../../hooks/navigate';

export default function Header(props: { isSaved: boolean }) {
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
            <SaveButton isSaved={props.isSaved} />
        </Toolbar>
    )
}

function SaveButton(props: { isSaved: boolean }) {
    const navigate = useNavigateHomePage()
    const updateDream = useDream(state => state.update)
    const saveDream = async () => {
        const ok = await updateDream()
        if (ok) navigate()
    }

    const color = props.isSaved ? 'success' : 'error'
    return (

        <IconButton
            sx={{
                position: 'absolute',
                right: 0
            }}
            color={color}
            onClick={saveDream}
        >
            <SaveIcon />
        </IconButton>
    )
}

function BackButton() {
    const navigate = useNavigateHomePage()

    const handleClick = () => {
        navigate()
    }

    return (
        <IconButton
            sx={{
                position: 'absolute',
                left: 0
            }}
            onClick={handleClick}
        >
            <ArrowBackIcon />
        </IconButton >
    )
}