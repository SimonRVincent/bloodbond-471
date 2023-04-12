import React from 'react';
import {Avatar, Box, Button, IconButton, keyframes, styled, Typography,} from '@mui/material';
import NoTitleLogo from '../assets/no-title-logo-500.png';
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import {useNavigate} from 'react-router-dom';
import {BloodBondTitle} from "../components/BloodBondTitle";
import {Background} from "../components/Background";


const StyledIconButton = styled(IconButton)(({theme}) => ({
    backgroundColor: "#B71C1C",
    color: "#fff",
    width: `calc(100% - ${theme.spacing(4)})`,
    borderRadius: "9999px",
    padding: `${theme.spacing(1.2)} ${theme.spacing(3)}`,
    boxShadow: `0px ${theme.spacing(0.5)} ${theme.spacing(1)} rgba(0, 0, 0, 0.25)`,
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.4s ease-in-out",
    marginRight: theme.spacing(2),

    '& .MuiSvgIcon-root': {
        fontSize: "2.4rem",
        marginRight: theme.spacing(1),
    },

    '& .MuiTypography-root': {
        textTransform: "capitalize",
        fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
        fontWeight: 700,
        transition: "font-size 0.2s ease-in-out",
    },

    '&:hover': {
        transform: "scale(1.05)",
        backgroundColor: "#9B2020",
        boxShadow: `0px ${theme.spacing(1)} ${theme.spacing(2)} rgba(0, 0, 0, 0.4)`,
    },

    '&:active': {
        transform: "scale(0.98)",
        boxShadow: "none",
    },

    [theme.breakpoints.down("xs")]: {
        width: "100%",
        padding: theme.spacing(1, 2),
        '& .MuiSvgIcon-root': {
            fontSize: "1.2rem",
            marginRight: theme.spacing(0.5),
        },
    },

    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(1.2, 3),
        marginRight: 0,
        marginBottom: theme.spacing(2),
        flexGrow: 1,
        minWidth: "200px",
        '& .MuiSvgIcon-root': {
            fontSize: "1.2rem",
            marginRight: theme.spacing(1),
        },
    },

    [theme.breakpoints.up("md")]: {
        '& .MuiSvgIcon-root': {
            fontSize: "1.2rem",
            marginRight: theme.spacing(1),
        },
        '& .MuiTypography-root': {
            fontSize: "clamp(0.8rem, 1.8vw, 1.2rem)",
            lineHeight: "1.4",
            transition: "font-size 0.2s linear",
        },
    },

    [theme.breakpoints.up("lg")]: {
        '& .MuiSvgIcon-root': {
            fontSize: "1.4rem",
            marginRight: theme.spacing(1),
        },
        '& .MuiTypography-root': {
            fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
            lineHeight: "1.6",
            transition: "font-size 0.2s linear",
        },
    },

    [theme.breakpoints.up("xl")]: {
        '& .MuiSvgIcon-root': {
            fontSize: "1.6rem",
            marginRight: theme.spacing(1),
        },
        '& .MuiTypography-root': {
            fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)",
            lineHeight: "1.8",
            transition: "font-size 0.2s linear",
        },
    }


}));

const SloganWord = styled(Typography)(({theme}) => ({
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '3.75rem',
    transition: theme.transitions.create('font-size', {
        duration: '0.3s',
        easing: 'cubic-bezier(0.17, 0.67, 0.52, 0.96)',
    }),
    [theme.breakpoints.only('xs')]: {
        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
    },
    [theme.breakpoints.only('sm')]: {
        fontSize: 'clamp(2rem, 5vw, 3rem)',
    },
    [theme.breakpoints.only('md')]: {
        fontSize: 'clamp(2rem, 5vw, 3rem)',
    },
    [theme.breakpoints.only('lg')]: {
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    },
    [theme.breakpoints.only('xl')]: {
        fontSize: 'clamp(3rem, 5vw, 4rem)',
    },
}));

const Slogan = React.memo(({firstWord, secondWord, thirdWord}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',

            }}
        >
            <SloganWord>{firstWord}&nbsp;</SloganWord>
            <SloganWord
                sx={{
                    color: '#B71C1C',
                    fontWeight: 700,
                    fontSize: '4.5rem',
                    textShadow: '2px 2px #444444',
                }}
            >
                {secondWord}&nbsp;
            </SloganWord>
            <SloganWord>{thirdWord}</SloganWord>
        </Box>
    );
});

const GradientText = styled(Typography)(({theme}) => ({
    fontSize: '1.5rem',
    fontWeight: 325,
    textAlign: 'center',
    letterSpacing: '2px',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    backgroundImage: 'linear-gradient(to right, #60230b, #a60000, #d20c0c, #ff1a1a, #ff6666, #e03c31, #c71f2d, #a6112b, #871327, #660d23)',
    backgroundSize: '200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `${gradientAnimation} 20s linear infinite`,

    [theme.breakpoints.only('xs')]: {
        fontSize: 'clamp(1.25rem, 2.5vw, 2rem)'
    },
    [theme.breakpoints.only('sm')]: {
        fontSize: 'clamp(1.5rem, 3vw, 1.8rem)'
    },
    [theme.breakpoints.only('md')]: {
        fontSize: 'clamp(1.8rem, 3.5vw, 2rem)'
    },
    [theme.breakpoints.only('lg')]: {
        fontSize: 'clamp(2rem, 4vw, 2.3rem)'
    },
    [theme.breakpoints.only('xl')]: {
        fontSize: 'clamp(2rem, 4vw, 2.5rem)'
    },
}));

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 50% 0%;
  }
  75% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 0% 50%;
  }
`;


const Description = ({text}) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', py: '2%'}}>
            <GradientText variant="h3">
                {text}
            </GradientText>
        </Box>
    );
}
const StyledLogo = styled(Avatar)(({theme}) => ({
    width: '12vw',
    height: 'auto',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
        width: '25vw',
    },
}));

const MainLogo = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', py: '2%'}}>
            <StyledLogo alt="Main Logo" src={NoTitleLogo}/>
        </Box>
    );
};

const Home = () => {
    const navigate = useNavigate();


    const handleClickDonor = () => {
        // this is where we will navigate to the donor page
        navigate('/donor');
    }

    const handleClickDoctor = () => {
        // this is where we will navigate to the doctor page
        navigate('/doctor');
    }


    return (
        <Box sx={{overflow: 'auto'}}>
            <Background>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh'
                }}>
                    <BloodBondTitle/>
                    <MainLogo/>
                    <Slogan firstWord="Every" secondWord="Drop" thirdWord="Counts"/>
                    <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: '1%', paddingBottom: '2%'}}>
                        <GradientText variant="h3">Make a difference today!</GradientText>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', lg: 'row'},
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: {xs: '1%', lg: '1.5%'},
                        flexWrap: 'wrap'
                    }}>
                        <Button onClick={handleClickDonor} variant="contained" sx={{
                            width: {xs: '100%', lg: '20vw'},
                            height: '10%',
                            fontSize: `clamp(0.75rem, 1.5vw, 1.25rem)`,
                            fontWeight: 600,
                            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                            backgroundColor: '#B71C1C',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#8c1313'
                            },
                            borderRadius: '999px',
                            py: `clamp(5px, 2vw, 10px)`, // Responsive vertical padding
                            my: '2%' // Add margin space between buttons
                        }}>
                            <BloodtypeOutlinedIcon sx={{
                                fontSize: `clamp(1rem, 2vw, 1.5rem)`,
                                marginRight: '8px'
                            }}/>
                            Donor
                        </Button>

                        <Button onClick={handleClickDoctor} variant="contained" sx={{
                            width: {xs: '100%', lg: '20vw'},
                            height: '10%',
                            fontSize: `clamp(0.75rem, 1.5vw, 1.25rem)`,
                            fontWeight: 600,
                            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                            backgroundColor: '#FF8A80',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#bf5f56'
                            },
                            borderRadius: '999px',
                            py: `clamp(5px, 2vw, 10px)`, // Responsive vertical padding
                            my: '2%' // Add margin space between buttons
                        }}>
                            <MedicalInformationOutlinedIcon sx={{
                                fontSize: `clamp(1rem, 2vw, 1.5rem)`,
                                marginRight: '8px'
                            }}/>
                            Doctor
                        </Button>
                    </Box>
                </Box>
            </Background>
        </Box>


    );
};

export default Home;
