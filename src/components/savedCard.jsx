import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import SaveCardData from "./SaveCardData";

export default function SavedCard(props) {
    const [htmlData, setHtmlData] = useState([]);
    const value = props.value;
    useEffect(() => {
        const data = localStorage.getItem("storedCardHTML");
        if (data) {
            setHtmlData(JSON.parse(data));
        }
    }, []);

    function DisplayData(data, index) {
        const date = new Date(data[0]?.today); 
        console.log(date);
        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        const daate = JSON.stringify(formattedDate);

        return (
            <Box key={index} sx={{ marginBottom: "2rem" ,display:"grid",alignItems:"center"}}>
                <Typography variant="h3" sx={{ marginBottom: "1rem" ,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    Date: {daate} 
                </Typography>
                <Box>
                    {data.map((item, idx) => (
                        <SaveCardData key={idx} item={item} />
                    ))}
                </Box>
            </Box>
        );
    }
    function DisplayFilteredData(data, index) {
        const date = new Date(data[0]?.today); 
        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    
        return (
            <Box key={index}>
                {data.map((item, idx) => {
                    if (item.rating === value) {
                        return <Box >
                            <Typography variant="h3" sx={{display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>{formattedDate}</Typography>
                            <SaveCardData key={idx} item={item} />
                            </Box>;
                    }
                    return null; 
                })}
            </Box>
        );
    }
    
    return (
        <Box>
    {value === 0 ? (
        htmlData && htmlData.length > 0 ? (
            htmlData.map((data, index) => DisplayData(data, index))
        ) : (
            <Typography>No saved data found.</Typography>
        )
    ) : (
        htmlData && htmlData.length > 0 ? (
            htmlData.map((data, value) => DisplayFilteredData(data, value))
        ) : (
            <Typography>No saved data found.</Typography>
        )
    )}
</Box>

    );
}
