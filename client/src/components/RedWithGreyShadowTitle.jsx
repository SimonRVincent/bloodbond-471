import {Typography} from "@mui/material";
import React from "react";

export const RedWithGreyShadowTitle = ({text}) => {
    return (
        <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
                mt: {xs: 2, md: 4},
                mb: {xs: 1.5, md: 2},
                fontWeight: 'bold',
                color: '#e0242a',
                textShadow: '2px 2px #757575',
                fontSize: `clamp(1.5rem, 6vw, 3.5rem)`,
            }}
        >
            {text}
        </Typography>
    );
};