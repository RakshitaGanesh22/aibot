import { Typography,Box,IconButton,Button,GRid2,useMediaQuery } from "@mui/material";
import Brightness5Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from "../themeprovider/themeContext";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from 'react';
export default function BotUi() {
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm')); 
    const { aiData, setaiData,htmlData,sethtmlData,cardRef,toggleTheme,mode } = useContext(ThemeContext);
    function handleClick(){
        navigate('/');
        setaiData([]);
        sethtmlData([]);
    }
    return (
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',height:isSmallScreen?"50px" :'60px', padding: '0 20px',position:"relative",top:"0"}}>
            <Box><Typography variant="h1" onClick={handleClick} sx={{'&:hover': {
            cursor: 'pointer'}}}>Bot AI</Typography></Box>
            <Box>
                <IconButton onClick={toggleTheme}>
                    {mode === 'light'? <Box sx={{display: 'flex', alignItems: 'center',gap:"0.5rem"}}><Brightness5Icon/><Typography>Light Mode</Typography></Box> : <Box sx={{display: 'flex', alignItems: 'center',gap:"0.5rem"}}><Brightness7Icon /><Typography>Dark Mode</Typography></Box>}
                </IconButton>
            </Box>
        </Box>

    )
}