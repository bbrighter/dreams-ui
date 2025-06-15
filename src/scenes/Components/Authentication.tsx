import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Box, Button, IconButton, Modal, SxProps, TextField } from '@mui/material'
import { useEffect, useState } from 'react';

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
    const [open, setOpen] = useState(false)
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isWrong, setIsWrong] = useState(false)
    const login = useDreams(state => state.login)
    const logout = useDreams(state => state.logout)
    const loggedIn = useDreams(state => state.loggedIn)

    const onClick = () => loggedIn ? logout() : setOpen(true)

    useEffect(() => {
        if (loggedIn) {
            setTimeout(() => setOpen(false), 500)
        }
    }, [loggedIn])


    const loginClick = async () => {
        setLoading(true)
        const ok = await login(password)
        setIsWrong(ok)
        setLoading(false)
    }

    const color = isWrong ? 'primary' : 'error'

    return (
        <>
            <IconButton
                onClick={onClick}>
                {loggedIn ? <LockOpenIcon /> : <LockIcon />}
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
                    />
                    <Button
                        color={color}
                        onClick={loginClick}
                        loading={loading}
                    >Login</Button>
                </Box>
            </Modal>
        </>
    )
}