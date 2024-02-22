import * as React from 'react'

import { Box, IconButton, Modal, SxProps, TextField } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import useDreams from '../../store/store';


const modalStyle: SxProps = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width: 300,
    padding: '3rem',

}

export default function Authentication() {
    const password = useDreams(state => state.password)
    const setPassword = useDreams(state => state.setPassword)
    const isCorrectPassword = useDreams(state => state.isValidPassword)()
    const [open, setOpen] = React.useState(false)
    const isEmptyPasswort = "" == password

    return (
        <>
            <IconButton
                onClick={() => setOpen(true)}>
                {isCorrectPassword ? <LockOpenIcon /> : <LockIcon />}
            </IconButton>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={modalStyle}>
                    <TextField
                        value={password}
                        type='password'
                        label='Passwort'
                        onChange={(e) => setPassword(e.target.value)}
                        error={!isCorrectPassword && !isEmptyPasswort}
                    />
                </Box>
            </Modal>
        </>
    )
}