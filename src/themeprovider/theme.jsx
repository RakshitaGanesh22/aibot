import { createTheme } from '@mui/material/styles';

const theme = (mode) => createTheme({
    palette: {
        mode: mode,
        primary: {
            main: mode === "light" ? "#9785BA" : "#fff",
            contrastText: mode === "light" ? "#fff" : "#000",
        },
        secondary: {
            main: mode === "light" ? "#AF9FCD" : "#a9a9a9",
        },
        background: {
            default: mode === "light" ? "#9785BA33" : "#555555",
            paper: mode === "light" ? "#D7C7F4" : "#3D3D3D",
            custom: {
                main: mode === "light" ? "#fff" : "#8D918D",
                overlay: mode === "light" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)", 
            },
        },
        text: {
            primary: mode === "light" ? "#000" : "#fff", 
            secondary: mode === "light" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)", 
        },
        customColors: {
            button: mode === "light" ? "#AF9FCD" : "#a9a9a9", 
            modal: mode === "light" ? "#FAF7FF" : "#C0C2C9", 
        },
    },
    typography: {
        body1: {
            fontFamily: 'Ubuntu, Open Sans, sans-serif',
            color: mode === 'light' ? '#000' : '#fff',
            fontSize: '16px',
            fontWeight: 400,
            '@media (max-width: 768px)': {
                fontSize: '14px',
            },
        },
        h1: {
            fontFamily: 'Ubuntu, Open Sans, sans-serif',
            color: mode === 'light' ? '#9785BA' : '#D7C7F4',
            fontSize: '32px',
            fontWeight: 700,
            '@media (max-width: 768px)': {
                fontSize: '26px',
            },
        },
        h2: {
            fontFamily: 'Ubuntu, sans-serif',
            color: mode === 'light' ? '#000' : '#fff',
            fontSize: '28px',
            fontWeight: 500,
            '@media (max-width: 600px)': {
                fontSize: '24px',
            },
        },
        h3: {
            fontFamily: 'Ubuntu, sans-serif',
            color: mode === 'light' ? '#000' : '#fff',
            fontSize: '20px',
            fontWeight: 600,
        },
    },
    breakpoints: {
        values: {
            xs: 576,
            sm: 820,
            md: 992,
            lg: 1200,
            xl: 1400,
        },
    },
});

export default theme;
