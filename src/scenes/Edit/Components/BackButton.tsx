import * as React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate()
    const goBack = () => {
        navigate('/')
    }

    return (
        <IconButton
            sx={{ float: 'left' }}
            onClick={goBack}
        >
            <ArrowBackIcon />
        </IconButton>
    )
}