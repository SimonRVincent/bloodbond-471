import React from 'react';
import {Box, IconButton, keyframes, styled, Typography,} from '@mui/material';
import NoTitleLogo from '../assets/no-title-logo-500.png';
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import {useNavigate} from 'react-router-dom';

const Title = () => {
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

    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "3rem 0 2rem",
                    marginBottom: "2rem",
                }}
            >
                <Typography
                    variant="h1"
                    style={{
                        fontSize: "6rem",
                        fontWeight: 700,
                        textAlign: "center",
                        marginRight: "1rem",
                        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    <span style={{color: "#B71C1C"}}>Blood</span>
                    <span style={{color: "#FF8A80"}}>Bond</span>
                </Typography>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "2rem 0",
                }}
            >
                <img
                    src={NoTitleLogo}
                    alt="logo"
                    style={{
                        height: "100px",
                        width: "auto",
                        objectFit: "contain",
                        objectPosition: "center",
                        marginBottom: "1rem",
                    }}
                />
                <Typography
                    variant="h2"
                    style={{
                        fontSize: "3rem",
                        fontWeight: 700,
                        textAlign: "center",
                        letterSpacing: "2px",
                        margin: "2rem 0",
                        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    Every{" "}
                    <span
                        style={{
                            fontWeight: 700,
                            fontSize: "5rem",
                            color: "#B71C1C",
                            textShadow: "2px 2px 0px rgba(0, 0, 0, 0.2)",
                        }}
                    >
            Drop
          </span>{" "}
                    Counts.
                </Typography>

                <Typography
                    variant="h3"
                    style={{
                        fontSize: "2rem",
                        fontWeight: 325,
                        textAlign: "center",
                        letterSpacing: "2px",
                        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                        backgroundImage: 'linear-gradient(to right, hsl(348, 79%, 64%), hsl(5, 80%, 46%), hsl(9, 81%, 34%), hsl(10, 82%, 22%), hsl(337, 68%, 28%), hsl(335, 72%, 42%), hsl(348, 79%, 64%), hsl(348, 79%, 64%))',
                        backgroundSize: "200%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: `${gradientAnimation} 10s ease infinite`,
                    }}
                >
                    Make a Difference Today!
                </Typography>
            </div>
        </>
    );
};
const StyledIconButton = styled(IconButton)(({theme}) => ({
    backgroundColor: "#B71C1C",
    color: "#fff",
    fontFamily: "Helvetica Neue, sans-serif",
    fontWeight: 700,
    fontSize: "1.4rem",
    textTransform: "uppercase",
    width: `calc(100% - ${theme.spacing(4)})`,
    borderRadius: "9999px",
    padding: `${theme.spacing(1.2)} ${theme.spacing(3)}`,
    boxShadow: `0px ${theme.spacing(0.5)} ${theme.spacing(1)} rgba(0, 0, 0, 0.25)`,
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.4s ease-in-out",
    marginRight: theme.spacing(2),

    "& .MuiSvgIcon-root": {
        fontSize: "2.4rem",
        marginRight: theme.spacing(1),
    },

    "&:hover": {
        transform: "scale(1.05)",
        backgroundColor: "#9B2020",
        boxShadow: `0px ${theme.spacing(1)} ${theme.spacing(2)} rgba(0, 0, 0, 0.4)`,
    },

    "&:active": {
        transform: "scale(0.98)",
        boxShadow: "none",
    },

    [theme.breakpoints.up("sm")]: {
        padding: `${theme.spacing(1.6)} ${theme.spacing(4)}`,
        marginRight: 0,
        marginBottom: theme.spacing(2),
        flexGrow: 1,
    },
}));

const StyledLabel = styled(Typography)(({theme}) => ({
    fontWeight: 700,
    fontSize: "1.6rem",
    textTransform: "uppercase",
}));

const CustomIconButton = ({icon, label, handleClick}) => {
    return (
        <StyledIconButton onClick={handleClick}>
            {icon}
            <StyledLabel>{label}</StyledLabel>
        </StyledIconButton>
    );
};

const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({theme}) => theme.spacing(3)};
  margin-top: ${({theme}) => theme.spacing(2)};
`;

const Home = () => {
    const navigate = useNavigate();

    const handleClickDoctor = () => {
        navigate('/Doctor');
    };

    const handleClickDonor = () => {
        navigate('/Donor');
    };
    const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;


    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            width="100vw"
            sx={{
                backgroundImage: "linear-gradient(-120deg, #ffcdd2, #fff)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                animation: `${gradientAnimation} 10s ease-in-out infinite`,
            }}
        >
            <Title/>
            <ButtonContainer>
                <CustomIconButton icon={<BloodtypeOutlinedIcon/>} label="Donor" handleClick={handleClickDonor}/>
                <CustomIconButton icon={<MedicalInformationOutlinedIcon/>} label="Doctor"
                                  handleClick={handleClickDoctor}/>
            </ButtonContainer>
        </Box>
    );
};
export default Home;
