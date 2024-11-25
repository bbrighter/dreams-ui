import * as React from "react";
import { createRoot } from "react-dom/client";
import "regenerator-runtime"; // needed otherwise vite does not build
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import scenes from "./scenes"

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const container = document.getElementById("root")!
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Routes>
                    {scenes.map(scene => {
                        return <Route {...scene.routeProps} key={scene.name} />
                    })}
                </Routes>
            </ThemeProvider>
        </React.StrictMode>
    </BrowserRouter>,
)
