import { Box, Card, CardContent, Typography, IconButton, useMediaQuery } from "@mui/material";
import image from "../assets/main.png";
import { useNavigate } from 'react-router-dom';
import {Button,TextField} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useState, useContext,useRef,useEffect} from "react";
import { ThemeContext } from "../themeprovider/themeContext";
import data from "../JSONdata/jsonData.json";
import CommonCard from "./CommonCard";
export default function Conversation() {
    const { aiData, setaiData,htmlData,sethtmlData,cardRef } = useContext(ThemeContext);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [question,setquestion]=useState("");
    const scrollRef = useRef(null); 
    const navigation = useNavigate();
    
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
            setaiData([]);
            sethtmlData([]);
            alert("data stored successfully!");
        navigation("/history")
        
        
    }
    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, [aiData]);
    const handleClick = (question) => {
        console.log(question);
        const matchedData = data.find((item) => item.question === question);
        
        const arrayData = matchedData
            ? { question: matchedData.question, answer: matchedData.response }
            : { question, answer: "Sorry, I did not understand your query!" };
        
        setaiData((prev) => [...prev, arrayData]);
        setquestion("");
    };
    return(
        <Box sx={{height:"80vh",width:"100vw",display:"grid",gap:"1rem", }} >
            <Box ref={scrollRef}  container sx={{width:"100vw", overflowY:"scroll",display:"flex",flexDirection:"column",gap:"4rem"}}>
                 {aiData.map((item,index) => (
                    <CommonCard key={index} question={item.question} answer={item.answer} />
                    
                ))}
            </Box>
           <Box sx={{display:"flex",gap:2,flexWrap:"wrap",justifyContent:"center",alignItems:"center",padding:isSmallScreen?2:4,position:"relative",bottom:0,zIndex:1000,width:"100%",position:"fixed",overflow:"visible",zIndex:1000}}>
           <TextField
          variant="outlined"
          value={question}
          onChange={(e) => setquestion(e.target.value)}
          label="Enter your message"
          sx={{ width: isSmallScreen ? "100%" : "50%", height: "100%",backgroundColor:"background.custom.main" }}
        />
                <Button color="text.primary" onClick={() => handleClick(question)} sx={{width:isSmallScreen?"40%": "10%",height:"50px",fontSize:"20px",backgroundColor:"background.paper"}} variant="contained">Ask</Button>
                <Button color="text.primary" sx={{width:isSmallScreen?"40%": "10%",height:"50px",fontSize:"20px",backgroundColor:"background.paper"}} variant="contained" onClick={handleStoreHTML}>Save</Button>
         </Box>
        </Box>
    )
}