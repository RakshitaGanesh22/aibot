import React from 'react';
import { useMediaQuery, Card, CardContent, Typography, Box, CardMedia, Rating } from "@mui/material";
import Boy from "../assets/Boy.png";
import Ai from "../assets/main.png";

export default function SaveCardData(props) {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { FeedBack, rating, time, today, userAnswer, userQuestion } = props.item;

    const cardStyles = {
        display: "flex",
        gap: isSmallScreen ? "1rem" : "2rem",
        alignItems: "center",
        padding: isSmallScreen ? "1rem" : "3rem",
        flexDirection: isSmallScreen ? "column" : "row",
        borderRadius: "1rem",
        width: "100%",
        maxWidth: isSmallScreen ? "90%" : "750px",
        justifyContent: "flex-start",
        boxSizing: "border-box",
        marginBottom: "2rem",
    };

    function UserQus() {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", flexWrap: "wrap" }}>
                <Card sx={{ ...cardStyles, backgroundColor: "background.paper" }}>
                    <CardMedia
                        component="img"
                        image={Boy}
                        sx={{ width: isSmallScreen ? 80 : 100, height: isSmallScreen ? 80 : 100, borderRadius: "50%" }}
                    />
                    <CardContent sx={{ textAlign: isSmallScreen ? "center" : "left" }}>
                        <Typography variant='h6'>YOU</Typography>
                        <Typography variant='body1'>{userQuestion}</Typography>
                        <Typography variant='body2'>{today} {time}</Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }

    function AiResponse() {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", flexWrap: "wrap" }}>
                <Card sx={{ ...cardStyles, backgroundColor: "secondary.main" }}>
                    <CardMedia 
                        component="img" 
                        image={Ai} 
                        sx={{ width: isSmallScreen ? 80 : 100, height: isSmallScreen ? 80 : 100, borderRadius: "50%" }} 
                    />
                    <CardContent sx={{ textAlign: isSmallScreen ? "center" : "left", display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <Typography variant='h6'>Soul AI</Typography>
                        <Typography variant='body1'>{userAnswer}</Typography>
                        <Box>
                            <Typography variant='body2'>{today} {time}</Typography>
                        </Box>
                        {rating>0 && (
                            <Box>
                                <Typography>Rate this response:</Typography>
                                <Rating value={rating} readOnly precision={0.5} />
                            </Box>
                        )}
                        {FeedBack && (
                            <Box sx={{ marginTop: "1rem" }}>
                                <Typography variant="body1">Feedback: 
                                    <span style={{ fontSize: "16px", fontWeight: "300", letterSpacing: "2px" }}>
                                        {FeedBack}
                                    </span>
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <UserQus />
            <AiResponse />
        </Box>
    );
}
