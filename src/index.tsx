import 'regenerator-runtime/runtime'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import scenes from './scenes'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <RouterProvider router={scenes} />
        </ThemeProvider>
    </React.StrictMode>,
)
