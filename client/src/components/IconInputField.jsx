import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";

export const IconInputField = ({label, icon, value, onChange}) => {
    return (
        <FormControl fullWidth sx={{
            '& label.Mui-focused': {color: '#B71C1C'},
            '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {borderColor: '#B71C1C'},
                '&.Mui-focused fieldset': {borderColor: '#B71C1C'},
                mb: 2
            }
        }}>
            <InputLabel htmlFor="input-field" color="primary">{label}</InputLabel>
            <OutlinedInput
                id="input-field"
                type="text"
                value={value}
                onChange={onChange}
                startAdornment={
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                }
                label={label}
            />
        </FormControl>
    );
};