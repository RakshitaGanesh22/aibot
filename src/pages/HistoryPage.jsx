import React from'react';
import ResponsiveAppBar from "../components/SideBar";
import BotUi from "../components/BotUi";
import InitialQus from "../components/InitialQus";
import { ThemeContext } from "../themeprovider/themeContext";
import { Box, IconButton, Typography,Autocomplete,TextField ,InputAdornment} from "@mui/material";
import {useContext,useEffect,useState} from "react";
import SavedCard from "../components/savedCard";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
export default function History(){
    const {htmlData,sethtmlData}=useContext(ThemeContext);
    const [value, setValue] = useState(0);
    const smallScreen = window.innerWidth < 800;
    useEffect(() => {
        const storedHTML = localStorage.getItem("storedCardHTML");
        if (storedHTML) {
            sethtmlData(storedHTML);  
        }
    }, []);
    const options=[0,1,2,3,4,5]
        


    
    return(<Box sx={{display:"flex",width:"100%",padding:"1rem",overflow:"hidden"}}>
        <Box sx={{height:"100vh",width:"20%"}}><ResponsiveAppBar/></Box>
        <Box sx={{position:"relative",width:smallScreen?"100%" :"80%",left:smallScreen?'-30':0}} >
            <Box sx={{position:"fixed",top:0,display:"flex",justifyContent:"space-between",width:"80%"}}><BotUi /></Box>
            <Typography variant='h2' sx={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"1rem",padding:"3rem"}}>Conversation History</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Autocomplete
            options={options}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select operation"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    color="primary"
                                    onClick={() => console.log(value)}
                                >
                                    <FilterAltIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            )}
            sx={{ width: '300px' }} // Adjust width as needed
        />
        </Box>
            <Box height={"80%"}>
                <SavedCard value={value} />
            </Box>
        </Box>
    </Box>)
    
}