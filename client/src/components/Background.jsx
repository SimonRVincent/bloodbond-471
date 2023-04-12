import {Grid, styled} from '@mui/material';

export const Background = styled(Grid)(({theme}) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(-120deg, #ff4f5a, #dc3545, #8b0000, #ffffff, #ffc0cb, #ff69b4)',
    backgroundSize: '800% 800%',
    animation: '$colorChange 10s ease infinite',

    [theme.breakpoints.down('sm')]: {
        animationDuration: '5s',
    },

    '@keyframes colorChange': {
        '0%': {
            backgroundPosition: '0% 50%',
        },
        '10%': {
            backgroundPosition: '100% 50%',
        },
        '20%': {
            backgroundPosition: '0% 0%',
        },
        '30%': {
            backgroundPosition: '100% 0%',
        },
        '40%': {
            backgroundPosition: '0% 100%',
        },
        '50%': {
            backgroundPosition: '100% 100%',
        },
        '60%': {
            backgroundPosition: '0% 50%',
        },
        '70%': {
            backgroundPosition: '100% 50%',
        },
        '80%': {
            backgroundPosition: '50% 0%',
        },
        '90%': {
            backgroundPosition: '50% 100%',
        },
        '100%': {
            backgroundPosition: '0% 50%',
        },
    },
}));

Background.animations = {
    colorChange: 'colorChange 10s ease infinite',
};
