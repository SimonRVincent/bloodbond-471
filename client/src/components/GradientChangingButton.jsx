import {Button} from "@mui/material";

export const GradientChangingButton = ({text, onClick}) => {
    return (
        <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
                background: 'linear-gradient(135deg, #B71C1C 0%, #FF8A80 100%)',
                color: 'white',
                borderRadius: '9999px',
                fontWeight: 'bold',
                padding: '12px 24px',
                letterSpacing: '0.5px',
                lineHeight: '1.4',
                transition: 'background-color 0.2s ease-in-out',
                '&:hover': {
                    background: 'linear-gradient(135deg, #B71C1C 0%, #FF6659 100%)',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                },
            }}
            onClick={onClick}
        >
            {text}
        </Button>
    );
};