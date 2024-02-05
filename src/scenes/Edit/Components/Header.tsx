import * as React from 'react'
import { IconButton, Input, Toolbar } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigateHomePage } from '../../../hooks/navigate';
import useDreams from '../../../store/store';

export default function Header(props: { isSaved: boolean }) {
    const date = useDreams(state => state.dream.date)
    const setDate = useDreams(state => state.setDate)
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
    const updateDream = useDreams(state => state.updateDream)
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