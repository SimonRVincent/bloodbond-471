import {Grid, InputAdornment, TextField} from "@mui/material";
import {RedTextField} from "./RedTextField";
import React from "react";

export const CountTextField = ({label, placeholder, name, suffix, onChange}) => {
    let stepValue;
    let minValue;
    let maxValue;

    switch (name) {
        case "bloodvolume":
            stepValue = 100;
            minValue = 200;
            maxValue = 10000;
            break;
        case "redbloodcells":
            stepValue = 0.1;
            minValue = 3;
            maxValue = 7;
            break;
        case "whitebloodcells":
            stepValue = 10;
            minValue = 3000;
            maxValue = 12000;
            break;
        case "platelets":
            stepValue = 1000;
            minValue = 150000;
            maxValue = 450000;
            break;
        default:
            stepValue = 1;
            minValue = 0;
            maxValue = 999999999;
            break;
    }

    return (
        <Grid item xs={12} sm={6} md={3}>
            <TextField
                label={label}
                placeholder={placeholder}
                name={name}
                type="number"
                InputProps={{
                    endAdornment: <InputAdornment position="end">{suffix}</InputAdornment>,
                }}
                fullWidth
                onChange={onChange}
                inputProps={{step: stepValue, min: minValue, max: maxValue}}
                sx={RedTextField}
            />
        </Grid>
    );
};