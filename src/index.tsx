import 'regenerator-runtime'; // needed otherwise vite does not build

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import scenes from './scenes'


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
    <BrowserRouter basename='dreams'>
        <React.StrictMode>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {scenes.map(scene => {
                            return <Route {...scene.routeProps} key={scene.name} />
                        })}
                    </Routes>
                </React.Suspense>
            </ThemeProvider>
        </React.StrictMode>
    </BrowserRouter>,
)
