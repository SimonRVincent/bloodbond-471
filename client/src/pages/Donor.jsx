import React from "react";
import {useNavigate,} from "react-router-dom";
import {Box, Button, Container, Divider, Grid, Typography} from "@mui/material";
import {BackButton} from "../components/BackButton";
import {BloodBondTitle} from "../components/BloodBondTitle";
import {Background} from "../components/Background";
import {Schedule} from "@mui/icons-material";
import {gradientAnimation} from "../components/GradientAnimationKeyframe";

const Donor = () => {


    const navigate = useNavigate();


    const handleClickDonorAppt = async (e) => {
        e.preventDefault();
        try {
            // Go to specified page
            navigate("/Donor/DonorAppt");

        } catch (err) {
            console.log(err);
        }
    };

    const handleClickBack = async (e) => {
        e.preventDefault();
    try {
      // Go to specified page
        navigate("/");

    } catch (err) {
      console.log(err);
    }
  };

  return (
      <Background>
          <Box sx={{py: 8}}>
              <Container maxWidth="md">
                  <Grid container spacing={2} direction="column" alignItems="center">
                      <Grid item xs={12}>
                          <BackButton onClick={handleClickBack}/>
                      </Grid>
                      <Grid item xs={12}>
                          <BloodBondTitle/>
                      </Grid>
                      <Grid item xs={12} md={8} lg={6}>
                          <Typography variant="h2" align="center" sx={{fontWeight: "bold", color: "#D32F2F", mb: 2}}>
                              Become a Blood Donor Today!
                          </Typography>
                          <Typography variant="body1" align="center" sx={{color: "#424242", fontSize: "1.2rem", mb: 4}}>
                              Thank you for considering becoming a blood donor. Your donation can make a real difference
                              in someone's life.
                          </Typography>
                          <Divider sx={{width: "60%", mx: "auto", mb: 4}}/>
                          <Typography variant="h4" align="center" sx={{fontWeight: "bold", color: "#D32F2F", mb: 2}}>
                              Join the BloodBond Community
                          </Typography>
                          <Typography variant="body1" align="center"
                                      sx={{color: "#424242", fontSize: "1.15rem", mb: 4}}>
                              By joining our community, you'll be able to select any hospital you'd like to donate to
                              and see firsthand the impact your donation makes.
                          </Typography>
                          <Box sx={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "column",
                              alignItems: "center"
                          }}>
                              <Typography variant="h3" align="center" sx={{
                                  fontWeight: "bold",
                                  background: "linear-gradient(75deg, #D32F2F, #B12A2A, #8B0000)",
                                  backgroundClip: "text",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  borderRadius: "10px",
                                  padding: "0 10px",
                                  my: 2,
                                  mx: "auto",
                                  animation: `${gradientAnimation} 5s ease-in-out infinite`,
                              }}>
                                  Ready to make a difference?
                              </Typography>


                              <Button
                                  variant="contained"
                                  size="large"
                                  sx={{
                                      backgroundColor: "#D32F2F",
                                      color: "white",
                                      fontWeight: "bold",
                                      borderRadius: "9999px",
                                      boxShadow: "none",
                                      "&:hover": {
                                          backgroundColor: "#B71C1C",
                                          color: "white",
                                      },
                                      py: 3,
                                      px: 6,
                                      my: 4,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      fontSize: "1.125rem",
                                      textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
                                  }}
                                  onClick={handleClickDonorAppt}
                              >
                                  <Schedule sx={{mr: 2}}/>
                                  Donate Now
                              </Button>
                          </Box>
                          <Typography variant="body1" align="center" sx={{
                              color: "#424242",
                              fontSize: "1.15rem",
                              fontWeight: "bold",
                              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
                              px: 4
                          }}>
                              Thank you for your contribution to our community!
                          </Typography>
                      </Grid>
                  </Grid>
              </Container>
          </Box>


      </Background>
  );
};

export default Donor;