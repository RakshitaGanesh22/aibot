import React, { useState, useEffect, useContext } from 'react';
import { useMediaQuery, Card, CardContent, Typography, Box, IconButton, CardMedia, Rating, TextField, Button } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Boy from "../assets/Boy.png";
import Ai from "../assets/main.png";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeContext } from "../themeprovider/themeContext";
import { format, formatDistanceToNow } from 'date-fns';

export default function CommonCard(props) {
    const { htmlData, sethtmlData } = useContext(ThemeContext);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { question, answer } = props;
    const [formattedTime, setFormattedTime] = useState("");
    const [value, setValue] = useState(0);
    const [thumbUp, setThumbUp] = useState(false);
    const [modal, setModal] = useState(false);
    const [feedBack, setFeedBack] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        const date = new Date();
        const dateString = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        const data = {
            userQuestion: question,
            userAnswer: answer,
            FeedBack: feedBack,
            rating: value,
            today: dateString, // Use dateString directly, not as an object
            time: formattedTime
        };

        if (htmlData.length > 0) {
            sethtmlData((prev) => {
                return prev.filter((item) => item.userQuestion !== question);
            });
            sethtmlData((prev) => [...prev, data]);
        } else {
            sethtmlData([data]);
        }
    }, [question, answer, feedBack, value, sethtmlData, formattedTime]);

    useEffect(() => {
        const currentTime = new Date();
        setFormattedTime(currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })); // Localized formatted time
    }, []);

    const cardStyles = {
        width: "750px",
        display: "flex",
        gap: isSmallScreen ? "1rem" : "2rem",
        alignItems: "center",
        padding: "3rem",
        borderRadius: "1rem",
        justifyContent: "flex-start",
        boxSizing: "border-box",
    };

    function UserQus() {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", width: "100%", borderRadius: "1rem" }}>
                <Card sx={{ ...cardStyles, backgroundColor: "background.paper" }}>
                    <CardMedia
                        component="img"
                        image={Boy}
                        sx={{ width: 100, height: 100, borderRadius: "50%" }}
                    />
                    <CardContent>
                        <Typography variant='h3'>YOU</Typography>
                        <Typography>{question}</Typography>
                        <Typography>{formattedTime}</Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }

    function AiResponce() {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", width: "100%", flexWrap: "wrap" }}>
                <Card sx={{ ...cardStyles, backgroundColor: "secondary.main" }}>
                    <CardMedia component="img" image={Ai} sx={{ width: 100, height: 100, borderRadius: "50%" }} />
                    <CardContent sx={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "flex-start" }}>
                        <Typography variant='h3'>Soul AI</Typography>
                        <Typography>{answer}</Typography>
                        <Box>
                            <Typography>{formattedTime}</Typography>
                            <IconButton aria-label="upvote" onClick={() => setThumbUp(!thumbUp)}>
                                {thumbUp ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                            </IconButton>
                            <IconButton aria-label="downvote" onClick={() => setModal(!modal)}>
                                {modal ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                            </IconButton>
                        </Box>
                        {thumbUp && (
                            <Box>
                                <Typography>Rate this response:</Typography>
                                <Rating
                                    value={value}
                                    precision={0.5}
                                    onChange={(event, newValue) => setValue(newValue)}
                                />
                            </Box>
                        )}
                        {modal && (
                            <Box sx={{
                                display: "grid", width: "100vw", height: "100vh", position: "fixed", zIndex: "1",
                                backgroundColor: "background.custom.overlay", padding: "2rem", top: "0px", left: "0px", gap: "1rem", borderRadius: "1rem"
                            }}>
                                <Box sx={{ height: isSmallScreen ? "200px" : "350px", width: isSmallScreen ? "90%" : "750px", backgroundColor: "background.custom.main", margin: "auto", display: "grid", padding: "2rem", justifyContent: 'center', alignItems: "center", borderRadius: "1rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", fontSize: "22px", width: "100%" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", fontSize: "22px", width: "95%" }}>
                                            <TipsAndUpdatesIcon sx={{ height: "40px", width: "40px" }} />
                                            <Typography variant='h3'>Provide Additional Feedback</Typography>
                                        </Box>
                                        <IconButton aria-label="close" onClick={() => { setModal(!modal); setFeedBack("") }}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                    <Box sx={{ flexDirection: "column", gap: "3rem", width: "100%" }}>
                                        <TextField
                                            sx={{ width: isSmallScreen ? "95%" : "100%" }}
                                            label="Your Feedback"
                                            multiline
                                            rows={4}
                                            onChange={(event) => setFeedBack(event.target.value)}
                                            value={feedBack}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                setShow(true);
                                                setModal(false);
                                            }}
                                            sx={{ marginTop: "1rem" }}>
                                            Submit
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                        {show && (
                            <Box sx={{ marginTop: "1rem" }}>
                                <Typography variant="h3">Feedback: <span style={{ fontSize: "16px", fontWeight: "300", letterSpacing: "2px" }}>{feedBack}</span></Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column", alignItems: "center", justifyContent: "center", width: isSmallScreen ? "85%" : "100%", height: "100%", marginBottom: "2rem" }}>
            <UserQus />
            <AiResponce />
        </Box>
    );
}
