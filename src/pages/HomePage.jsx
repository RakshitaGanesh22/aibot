import React from'react';
import ResponsiveAppBar from "../components/SideBar";
import BotUi from "../components/BotUi";
import InitialQus from "../components/InitialQus";
import { Box } from "@mui/material";
export default function Home(){
    const smallScreen = window.innerWidth < 800;
    return(<Box sx={{display:"flex",width:"100%",padding:"1rem",overflow:"hidden"}}>
        <Box sx={{height:"100vh",width:"20%"}}><ResponsiveAppBar/></Box>
        <Box sx={{position:"relative",width:smallScreen?"100%" :"80%",left:smallScreen?'-30':0}} >
            <BotUi />
            <InitialQus />
        </Box>
    </Box>)
    
}