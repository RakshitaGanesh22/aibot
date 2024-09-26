import { Box, Card, CardContent, Typography, IconButton, useMediaQuery } from "@mui/material";
import image from "../assets/main.png";
import {Button,TextField} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useState, useContext } from "react";
import { ThemeContext } from "../themeprovider/themeContext";
import data from "../JSONdata/jsonData.json";
import CommonCard from "./CommonCard";
import Conversation from "./conversation";
import { useNavigate } from 'react-router-dom';
export default function InitialQus() {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { aiData, setaiData,htmlData,sethtmlData,cardRef } = useContext(ThemeContext);
    const [question,setquestion]=useState("");
    const navigation = useNavigate();
    const initialCardData = [
        "Hi, what is the weather",
        "Hi, what is my location",
        "Hi, what is the temperature",
        "Hi, how are you"
    ];
    function handleStoreHTML(){
        console.log("Captured HTML:", htmlData);
        let storedCardData = localStorage.getItem("storedCardHTML");
        let storedCardArray = [];
        if (storedCardData) {
            storedCardArray = JSON.parse(storedCardData);
        }
        storedCardArray.push(htmlData);
        storedCardData = JSON.stringify(storedCardArray);
    
        localStorage.setItem("storedCardHTML", storedCardData);
        sethtmlData([]);
        alert("data stored successfully!");
    navigation("/history")
    
    
}

    const handleClick = (question) => {
        console.log(question);
        const matchedData = data.find((item) => item.question === question);
        
        const arrayData = matchedData
            ? { question: matchedData.question, answer: matchedData.response }
            : { question, answer: "Sorry, I did not understand your query!" };
        
        setaiData((prev) => [...prev, arrayData]);
    };
    
    const Cards = ({ question }) => {
        const [hover, setHover] = useState(false);

        return (
            <Card
                sx={{
                    width: isSmallScreen ? "100%" : "45%",
                    height: "120px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                    letterSpacing: "1.5px",
                    backgroundColor: "background.custom.main",
                    boxShadow: 8,
                    transition: "transform 0.2s ease",
                    ...(hover && { transform: "scale(1.05)" }),
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <Box>
                        <Typography variant="h3">{question}</Typography>
                        <Typography variant="body2">Get immediate AI-generated response</Typography>
                    </Box>
                    {hover && (
                        <IconButton onClick={() => handleClick(question)}>
                            <ArrowUpwardIcon />
                        </IconButton>
                    )}
                </CardContent>
            </Card>
        );
    };

    return (
        <Box sx={{ display: "grid", justifyContent: "center", alignItems: "center", width: "100%", gap: isSmallScreen ? "1rem" : "5rem" }}>
            {aiData.length === 0 && (
                <Box sx={{ display: "grid", gap: isSmallScreen ? "0.5rem" : "1rem", textAlign: "center" }}>
                    <Typography variant="h1" sx={{color:"text.primary"}}>How Can I Help You Today?</Typography>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Box component="img" src={image} alt="main" sx={{ height: "65px", width: "65px", borderRadius: "50%" }} />
                    </Box>
                </Box>
            )}

            {aiData.length === 0 && (
                <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-around",width:"100%",gap:"3rem"}}>
                <Box sx={{ display: "grid", gap: "1rem" }}>
                    <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                        {initialCardData.map((question, index) => (
                            <Cards key={index} question={question} />
                        ))}
                    </Box>
                </Box>
                <Box sx={{display:"flex",gap:2,flexWrap:"wrap",justifyContent:"center",alignItems:"center",padding:isSmallScreen?2:4,position:"relative",bottom:0,zIndex:1000}}>
                <TextField variant="outlined" onChange={(e) => setquestion(e.target.value)} label="Enter your message" sx={{width:isSmallScreen?"100%": "50%",height:"50px"}}/>
                <Button color="text.primary" onClick={() => handleClick(question)} sx={{width:isSmallScreen?"40%": "10%",height:"50px",fontSize:"20px",backgroundColor:"background.paper"}} variant="contained">Ask</Button>
                <Button color="text.primary" sx={{width:isSmallScreen?"40%": "10%",height:"50px",fontSize:"20px",backgroundColor:"background.paper"}} variant="contained" onClick={handleStoreHTML}>Save</Button>
                </Box>
                </Box>
            )}

            {aiData.length !== 0 && (
                <Conversation/>
            )}
            
        </Box>
    );
}

