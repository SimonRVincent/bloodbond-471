import {Button, Card, CardContent, Typography} from "@mui/material";
import React from "react";

export const MenuCard = ({title, subtitle, icon, onClick, buttonLabel}) => {
    const CustomIcon = icon;
    return (
        <Card sx={{maxWidth: 500, borderRadius: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
            <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <CustomIcon sx={{color: "#B71C1C", fontSize: "5rem", marginBottom: "1rem"}}/>
                <Typography variant="h5" component="div"
                            sx={{fontWeight: "bold", fontSize: "1.5rem", textAlign: "center", marginBottom: "1rem"}}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    textAlign: "center",
                    marginBottom: "1rem",
                    fontWeight: "300",
                    fontSize: "clamp(0.8rem, 1.5vw, 1rem)"
                }}>
                    {subtitle}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "transparent",
                        color: "#B71C1C",
                        fontWeight: "bold",
                        borderRadius: "30px",
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                        marginBottom: "1rem",
                        textTransform: "none",
                        fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                        padding: "0.5rem 1rem",
                        border: "2px solid #B71C1C",
                        "&:hover": {
                            backgroundColor: "#B71C1C",
                            color: "white",
                            transform: "scale(1.05)",
                        },
                        transition: "transform 0.2s ease-in-out",
                    }}
                    onClick={onClick}
                >
                    {buttonLabel}
                </Button>
            </CardContent>
        </Card>
    );
};