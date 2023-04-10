// const BloodBondTitle = React.memo(() => {
//     return (
//         <Typography variant="h1" fontWeight={900} textAlign="center" fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
//                     sx={{
//                         fontSize: {
//                             xs: "clamp(2rem, 8vw, 4rem)",
//                             sm: "clamp(3rem, 5vw, 6rem)",
//                             md: "clamp(3rem, 5vw, 6rem)"
//                         }
//                     }}>
//             <Box component="span" sx={{ color: "#B71C1C" }}>Blood</Box>
//             <Box component="span" sx={{ color: "#FF8A80" }}>Bond</Box>
//         </Typography>
//     );
// });
//
import React from "react";
import {Box, Typography, useMediaQuery} from "@mui/material";

export const BloodBondTitle = React.memo(() => {
    const isMobile = useMediaQuery('(max-width:600px)');

    const calculatedFontSize = isMobile ? 'clamp(2.4rem, 10vw, 3.6rem)' : 'clamp(3.6rem, 6vw, 7.2rem)';

    return (
        <Box sx={{padding: '2rem'}}>
            <Typography
                variant="h1"
                fontWeight={900}
                align="center"
                fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
                sx={{
                    fontSize: calculatedFontSize,
                    color: '#B71C1C',
                }}
            >
                <Box component="span" sx={{color: '#B71C1C'}}>Blood</Box>
                <Box component="span" sx={{color: '#FF8A80'}}>Bond</Box>
            </Typography>
        </Box>
    );
});