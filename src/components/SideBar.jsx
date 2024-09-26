import React, { useState, useContext } from 'react';
import { Avatar, Button, AppBar, Toolbar, Typography, IconButton, Drawer, Box, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeContext } from "../themeprovider/themeContext";
import MainIcon from "../assets/main.png";
import { useNavigate } from 'react-router-dom';
const ResponsiveAppBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false); 
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm')); 
    const { aiData, setaiData,htmlData,sethtmlData,cardRef } = useContext(ThemeContext);
    const navigate = useNavigate();
    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };
    function handleClick () {
        navigate('/');
        setaiData([]);
        sethtmlData([]);
    }
    
    function goToHistory(){
        navigate('/history');
    }

    const drawerContent = (
        <Box
            sx={{ width: "100%",height: "100vh", display: 'flex', flexDirection: 'column', gap: '1rem',float:"left",backgroundColor: "background.custom.main" }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Box sx={{ display: 'flex', justifyContent: "flex-end", alignItems: "center" }}>
                <IconButton onClick={toggleDrawer(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box
                    sx={{ width: "300px", display: 'flex', flexDirection: 'column', gap: '1rem',}}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
        
                    <Box sx={{ display: 'flex', justifyContent: "space-around", alignItems: 'center', backgroundColor: 'background.paper', width: "300px", height: "60px"}}>
                        <Box
                            component="img"
                            src={MainIcon} 
                            alt="main"
                            sx={{ width: 40, height: 40, borderRadius: "10px",boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}
                        />
                        <Typography variant="h3" sx={{ marginLeft: 1 ,"&:hover":{cursor:"pointer"}}} onClick={handleClick}>
                            New Chat
                        </Typography>
                        <IconButton  sx={{ marginLeft: 1 ,"&:hover":{cursor:"pointer"}}} onClick={handleClick}>
                            <AddBoxIcon />
                        </IconButton>
                    </Box>
        
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                        <Button sx={{ height: "40px", width: "180px", color: 'text.primary', backgroundColor: 'background.paper', textTransform: 'none' }} onClick={goToHistory}>
                            Past Conversations
                        </Button>
                    </Box>
                </Box> 
        </Box>
    );

    return (
        <AppBar sx={{"@media (min-width: 800px)" :{ width:"20%",height:"100vh",backgroundColor: "background.custom.main",position:"fixed",top:0,left:0,zIndex:1000}}}>
            <Toolbar sx={{"@media (max-width: 800px)" :{ width:"0%",position:"fixed",top:0,left:0,zIndex:1000}}}>
                {isSmallScreen ? (
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx=
                    {{ marginLeft: "-1rem",width: "40px",height: "50px"}}>
                        <MenuIcon sx={{ color: "text.primary" }} />
                    </IconButton>
                ) : (
                    <Box
                    sx={{ width: "100%", display: 'flex', flexDirection: 'column', gap: '1rem',justifyContent:"center",alignItems:"center"}}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
        
                    <Box sx={{ display: 'flex', justifyContent: "space-around", alignItems: 'center', backgroundColor: 'background.paper', width: "120%", height: "60px"}}>
                        <Box
                            component="img"
                            src={MainIcon} 
                            alt="main"
                            sx={{ width: 40, height: 40, borderRadius: "10px",boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}
                        />
                        <Typography variant="h3" sx={{ marginLeft: 1,"&:hover":{cursor:"pointer"} }} onClick={handleClick}>
                            New Chat
                        </Typography>
                        <IconButton onClick={handleClick} sx={{"&:hover":{cursor:"pointer"}}}>
                            <AddBoxIcon />
                        </IconButton>
                    </Box>
        
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                        <Button sx={{ height: "40px", width: "180px", color: 'text.primary', backgroundColor: 'background.paper', textTransform: 'none' }} onClick={goToHistory}>
                            Past Conversations
                        </Button>
                    </Box>
                </Box> 
                )}
                
            </Toolbar>
            
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerContent}
            </Drawer>
        </AppBar>
    );
};

export default ResponsiveAppBar;
