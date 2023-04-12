import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { BackButton } from "../components/BackButton";
import { BloodBondTitle } from "../components/BloodBondTitle";
import { gradientAnimation } from "../components/GradientAnimationKeyframe";
import { RedWithGreyShadowTitle } from "../components/RedWithGreyShadowTitle";
import { BookingButton } from "../components/BookingButton";

const BloodTransfusion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataObject = JSON.parse(
    new URLSearchParams(location.search).get("data")
  );
  const [showInfo, setShowInfo] = useState(false);

  const [appt, setAppt] = useState({
    date: null,
    time: null,
    location: "",
    hcid: null,
    confirmationid: null,
    status: 0,
  });
  console.log(appt);
  const [error, setError] = useState(false);

  const [checkResult, setCheckResult] = useState(null);

  const handleChange = (e) => {
    setAppt((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(dataObject);
    if (dataObject != null) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  }, [dataObject]);

  const handleClickBack = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/DoctorHome");
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log(appt.hcid);
      const response = await axios.post(
        "http://localhost:8800/checkRecipientExists",
        { valueToCheck: appt.hcid }
      );
      setCheckResult(response.data.exists);
      if (response.data.exists) {
        await axios.post("http://localhost:8800/bookAppointment", appt);
        navigate("/DoctorHome");

        if (dataObject != null) {
          try {
            console.log("changing blood status");
            console.log(dataObject.Blood_ID);
            await axios.post("http://localhost:8800/changeBloodStatus", {
              Blood_ID: dataObject.Blood_ID,
            });
          } catch (err) {
            console.log(err);
          }

          try {
            console.log("changing request status");
            console.log(dataObject.Request_ID);
            await axios.post("http://localhost:8800/changeRequestStatus", {
              Request_ID: dataObject.Request_ID,
            });
          } catch (err) {
            console.log(err);
          }
        }
        alert("Appointment booked successfully.");
      } else {
        alert("HCID not found. Please register recipient.");
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const hospitals = [
    "Foothills Medical Centre",
    "Peter Lougheed Centre",
    "Rockyview General Hospital",
    "South Health Campus",
    "Tom Baker Cancer Centre",
    "Sheldon M. Chumir Health Centre",
    "Alberta Children's Hospital",
  ];

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        background: "linear-gradient(to bottom, #fff, #ffd6d6)",
        backgroundSize: "400% 400%",
        animation: `${gradientAnimation} 15s ease infinite`,
        padding: "2rem",
        borderRadius: "10px",
      }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            padding: "2rem",
            borderRadius: "10px",
          }}
        >
          <Box py={2}>
            <BloodBondTitle />
            <BackButton onClick={handleClickBack} />
            <RedWithGreyShadowTitle text="Book Transfusion" />
            <Typography
              variant="body1"
              align="center"
              paragraph
              sx={{
                mt: 1,
                fontWeight: 400,
                fontSize: "1.2rem",
                color: "#757575",
                lineHeight: 1.5,
                letterSpacing: "0.05rem",
              }}
            >
              Please enter your patient's health care ID and select the
              preferred date, time, and location for the blood transfusion
              appointment.
            </Typography>
          </Box>

          <Box py={2}>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{
                py: 2,
                fontWeight: "bold",
                letterSpacing: "0.5px",
                borderBottom: "3px solid #e0242a",
                color: "#444",
                textTransform: "uppercase",
                fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                textShadow: "0 1px 1px rgba(0,0,0,0.25)",
              }}
            >
              Appointment Details
            </Typography>
            <form onSubmit={handleClick}>
              <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="hcid"
                    name="hcid"
                    label="Health Care ID"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="date"
                    name="date"
                    label="Appointment Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    sx={{
                      mb: 2,
                      // bgcolor: "#ffffff",
                      color: "#000000",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#c1c1c1",
                      },
                      "& .MuiInputBase-root": {
                        "&.Mui-focused": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#c1c1c1",
                          },
                        },
                      },
                    }}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                      // max date is 1 year from today
                      max: new Date(
                        new Date().setFullYear(new Date().getFullYear() + 1)
                      )
                        .toISOString()
                        .split("T")[0],
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="time"
                    name="time"
                    label="Time"
                    type="time"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#c1c1c1",
                      },
                      "& .MuiInputBase-root": {
                        "&.Mui-focused": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#c1c1c1",
                          },
                        },
                      },
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="location-label">Location</InputLabel>
                    <Select
                      labelId="location-label"
                      id="location"
                      name="location"
                      label="Location"
                      onChange={handleChange}
                      sx={{
                        "& .MuiSelect-select:focus": {
                          backgroundColor: "#ffffff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#c1c1c1",
                        },
                        "& .MuiSelect-icon": {
                          color: "#c1c1c1",
                        },
                      }}
                    >
                      {hospitals.map((hospital) => (
                        <MenuItem key={hospital} value={hospital}>
                          {hospital}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <BookingButton
                    type="submit"
                    label="Book Transfusion Appointment"
                  />
                </Grid>
                {showInfo ? (
                  <div>
                    <h3>Blood to reserve for transfusion</h3>
                    <p>
                      Blood ID: {dataObject.Blood_ID} for Blood Request ID:{" "}
                      {dataObject.Request_ID} for patient with HCID:{" "}
                      {dataObject.HCID}
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
              </Grid>
            </form>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default BloodTransfusion;
