import axios from "axios";
import React, {useState} from "react";
import {useLocation, useNavigate,} from "react-router-dom";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {BloodBondTitle} from "../components/BloodBondTitle";
import {BackButton} from "../components/BackButton";
import {LocalHospitalOutlined} from "@mui/icons-material";
import {BookingButton} from "../components/BookingButton";
import {gradientAnimation} from "../components/GradientAnimationKeyframe";
import {RedWithGreyShadowTitle} from "../components/RedWithGreyShadowTitle";

const DonorDate = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const hcid = location.state ? location.state.hcid : null;

  const [appt, setAppt] = useState({
    date: null,
    time: null,
    location: "",
    hcid: hcid,
    confirmationid: null,
    status: 0,
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setAppt((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // ** HAVE TO EDITN THIS HERE TO POST TO DATABASE **
      await axios.post("http://localhost:8800/bookAppointment", appt);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  const hospitals = [
    "Foothills Medical Centre",
    "Peter Lougheed Centre",
    "Rockyview General Hospital",
    "South Health Campus",
    "Tom Baker Cancer Centre",
    "Sheldon M. Chumir Health Centre",
    "Alberta Children's Hospital"
  ];


  return (
      <Grid container justifyContent="center" sx={{
        background: 'linear-gradient(to bottom, #fff, #ffd6d6)',
        backgroundSize: '400% 400%',
        animation: `${gradientAnimation} 15s ease infinite`,
        padding: '2rem',
        borderRadius: '10px',
      }}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                // background: 'linear-gradient(to bottom, #FFF, #FFD6D6)',
                padding: '2rem',
                borderRadius: '10px',
              }}
          >
            <Box py={2}>
              <BloodBondTitle/>
              <RedWithGreyShadowTitle text="Donor Appointment"/>
              <Typography variant="body1" align="center" paragraph sx={{
                mt: 1,
                fontWeight: 400,
                fontSize: '1.2rem',
                color: '#757575',
                lineHeight: 1.5,
                letterSpacing: '0.05rem'
              }}>
                Please select your preferred date, time, and location for your blood donation appointment.
              </Typography>
            </Box>

            <Box py={2}>
              <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{
                    py: 2,
                    fontWeight: 'bold',
                    letterSpacing: '0.5px',
                    borderBottom: '3px solid #e0242a',
                    color: '#444',
                    textTransform: 'uppercase',
                    fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
                    textShadow: '0 1px 1px rgba(0,0,0,0.25)',
                  }}
              >
                Appointment Details
              </Typography>
              <form>
                <Grid container spacing={2} sx={{p: 3}}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        id="date"
                        name="date"
                        label="Appointment Date"
                        type="date"
                        variant="outlined"
                        InputLabelProps={{shrink: true}}
                        fullWidth
                        onChange={handleChange}
                        inputProps={{
                          min: new Date().toISOString().slice(0, 10),
                          max: new Date(new Date().getFullYear(), new Date().getMonth() + 4, 0).toISOString().slice(0, 10),
                          style: {color: "#6e767d", fontSize: "1.2rem"}
                        }}
                        sx={{
                          "& .MuiInputBase-root": {
                            borderRadius: "30px",
                            backgroundColor: "#f5f8fa",
                          },
                          "& .MuiOutlinedInput-root": {
                            "&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#ccc",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#e0242a",
                            },
                            borderRadius: "30px",
                            borderColor: "#ccc",
                          },
                          "& .MuiInputLabel-root": {
                            paddingLeft: "12px",
                            paddingRight: "12px",
                            paddingTop: "4px",
                            paddingBottom: "4px",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "#1C1E21",
                            borderRadius: "30px",
                            backgroundColor: "white",
                          },

                        }}
                        mb={3}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} mb={3}>
                    <TextField
                        id="time"
                        name="time"
                        label="Appointment Time"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{shrink: true}}
                        fullWidth
                        onChange={handleChange}
                        inputProps={{
                          min: "08:00",
                          max: "18:30",
                          step: "1800",
                          style: {color: "#6e767d", fontSize: "1.2rem"}
                        }}
                        sx={{
                          "& .MuiInputBase-root": {
                            borderRadius: "30px",
                            backgroundColor: "#f5f8fa",
                          },
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                            borderRadius: "30px",
                            top: "-2px",
                            borderColor: "#ccc",
                          },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e0242a",
                          },
                          "& .MuiInputLabel-root": {
                            backgroundColor: "white",
                            paddingLeft: "12px",
                            paddingRight: "12px",
                            paddingTop: "4px",
                            paddingBottom: "4px",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "#1C1E21",
                            borderRadius: "30px",
                          },
                        }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth sx={{
                      borderRadius: "30px",
                      backgroundColor: "#f5f8fa",
                      "& .MuiSelect-icon": {
                        color: "#e0242a",
                      },
                      "& .MuiInputBase-root": {
                        borderRadius: "30px",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "1.2rem",
                        paddingLeft: "12px",
                        paddingRight: "36px",
                      },
                      "& .MuiInputBase-input:focus": {
                        backgroundColor: "#fff",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "1.2rem",
                        color: "#1C1E21",
                        fontWeight: "bold",
                        width: "auto",
                        paddingRight: "12px",
                        marginTop: "-3px",
                        backgroundColor: "#fff",
                        paddingLeft: "12px",
                        borderRadius: "30px",
                      },
                      "& .MuiMenuItem-root": {
                        fontSize: "1.2rem",
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "30px",
                        top: "-2px",
                        borderColor: "#ccc",
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0242a",
                      },
                    }}
                    >
                      <InputLabel htmlFor="hospital-select" sx={{
                        backgroundColor: "#f5f8fa",
                        paddingLeft: "12px",
                        paddingRight: "36px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#1C1E21",
                        borderRadius: "30px",
                        boxShadow: "none",
                        "&.Mui-focused": {
                          boxShadow: "none",
                        },
                      }}
                      >
                        Select Hospital
                      </InputLabel>
                      <Select
                          labelId="hospital-select-label"
                          id="hospital-select"
                          name="location"
                          value={appt.location}
                          onChange={handleChange}
                          label="Hospital"
                          startAdornment={
                            <InputAdornment position="start">
                              <LocalHospitalOutlined style={{color: '#e0242a'}}/>
                            </InputAdornment>
                          }
                      >
                        {hospitals.map((hospital) => (
                            <MenuItem key={hospital} value={hospital}>{hospital}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
                    <BookingButton label="Book Appointment" onClick={handleClick} sx={{mr: 2}}/>
                    {error && (
                        <Typography variant="body1" color="error">
                          There was an error booking your appointment. Please try again later.
                        </Typography>
                    )}
                  </Grid>
                </Grid>
              </form>
            </Box>
            <Box py={2}>
              <Grid container justifyContent="center">
                <Grid item>
                  <BackButton onClick={handleClickBack}/>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Grid>


  );
};

export default DonorDate;