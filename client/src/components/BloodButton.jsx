import {Button} from "@mui/material";
import React from "react";

export const BloodButton = ({onClick, children}) => {
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onClick}
            sx={{
                borderRadius: "9999px",
                bgcolor: "#b71c1c", // Blood red color code
                color: "#fff",
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                transition: "all 0.3s ease",
                padding: "14px 28px",
                "&:hover": {
                    bgcolor: "#8c1b1b", // Darker shade of blood red
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.16)",
                },
                "@media (max-width: 600px)": {
                    width: "100%",
                    fontSize: "clamp(1rem, 4vw, 1.15rem)",
                    padding: "10px 20px",
                },
                "@media (min-width: 600px) and (max-width: 960px)": {
                    fontSize: "clamp(1rem, 3.5vw, 1.25rem)",
                },
                "@media (min-width: 960px)": {
                    fontSize: "1.25rem",
                },
            }}
        >
            {children}
        </Button>
    );
};