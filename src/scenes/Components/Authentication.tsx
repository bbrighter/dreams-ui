import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import { SxProps } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'

import { useDreams } from '../../store'

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
    const { login, logout, loggedIn } = useDreams()

    const onClick = () => loggedIn ? logout() : setOpen(true)
    const onClose = () => {
        setOpen(false)
        setPassword('')
        setIsWrong(false)
    }

    useEffect(() => {
        if (loggedIn) {
            setTimeout(() => setOpen(false), 500)
        }
    }, [loggedIn])

    const loginClick = async () => {
        setLoading(true)
        const ok = await login(password)
        setIsWrong(!ok)
        setLoading(false)
    }

    return (
        <>
            <IconButton
              onClick={onClick}
            >
                {loggedIn ? <LockOpenIcon /> : <LockIcon />}
            </IconButton>
            <Modal
              open={open}
              onClose={onClose}
            >
                <Fade in={open}>
                    <Box sx={modalStyle}>
                        <TextField
                          value={password}
                          type="password"
                          label="Passwort"
                          error={isWrong}
                          onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                          variant="contained"
                          sx={{ mt: '1rem' }}
                          onClick={loginClick}
                          loading={loading}
                        >
                            Login
                        </Button>
                    </Box>
                </Fade>
            </Modal>

        </>
    )
}
