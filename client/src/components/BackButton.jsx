import {Button} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import React from "react";

export const BackButton = ({
                               onClick = () => {
                               },
                           }) => {
    return (
        <Button
            variant="text"
            onClick={onClick}
            sx={{
                color: "#B71C1C",
                textTransform: "none",
                fontWeight: "bold",
                position: "absolute",
                left: "16px",
                top: "16px",
                display: "flex",
                alignItems: "center",
                fontSize: {xs: "1rem", sm: "1.25rem"},
            }}
        >
            <ArrowBack sx={{fontSize: "inherit", mr: 0.5}}/>
            Back
        </Button>
    );
};