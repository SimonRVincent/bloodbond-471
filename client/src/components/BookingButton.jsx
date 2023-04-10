import {Button} from "@mui/material";
import React from "react";

export const BookingButton = ({label, onClick}) => {
    return (
        <Button
            variant="contained"
            sx={{
                bgcolor: "#e0242a",
                color: "white",
                borderRadius: "30px",
                padding: "12px 32px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "1.2rem",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                    bgcolor: "#c6121d",
                    transform: "scale(1.05)",
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: "background-color 0.2s, transform 0.2s, box-shadow 0.2s",
                },
                "&:active": {
                    transform: "scale(0.95)",
                    boxShadow: 'none',
                    transition: "transform 0.2s, box-shadow 0.2s",
                },

            }}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};