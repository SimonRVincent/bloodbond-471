import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import RecipientInformation from "./RecipientInformation";
import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material";
import {BackButton} from "../components/BackButton";
import {BloodBondTitle} from "../components/BloodBondTitle";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";


const BloodRequest = () => {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState({hcid: null});
  const [insertionResult, setInsertionResult] = useState(null);
  const [insertionResult2, setInsertionResult2] = useState(null);
  const [error, setError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleChange = (e) => {
    setRecipient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickBack = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/DoctorHome");
    } catch (err) {
      console.log(err);
    }
  };

  const handleBloodRequest = async (e) => {
    e.preventDefault();
    try {
      if (insertionResult.length > 0 && insertionResult[0].Blood_type) {
        const response = await axios.post("http://localhost:8800/bloodRequest", insertionResult[0]);
        console.log("Response 1:", response.data);
        if (response.data.length < 1) {
          try {
            const response2 = await axios.post("http://localhost:8800/insertBloodRequest", insertionResult[0]);
            console.log("Response 2:", response2.data);
            navigate(`/DoctorHome/BloodRequest/BloodRequestResult?data=${JSON.stringify(response2.data)}`);
          }
          catch (error) {
            console.error("Error inserting blood request:", error);
          }
        }
        navigate(`/DoctorHome/BloodRequest/BloodRequestResult?data=${JSON.stringify(response.data)}`);
        console.log(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(true);
      } else {
        console.error("Error making blood request:", error);
      }
    }
  };
  



  useEffect(() => {
    console.log("insertionResult changed:", insertionResult);
    console.log("insertionResult2 changed:", insertionResult2);
  }, [insertionResult, insertionResult2]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/getRecipient",
        recipient
      );
      setInsertionResult(response.data);
      console.log("insertionResult:", insertionResult);
    } catch (error) {
      if (error.response.status === 409) {
        setInsertionResult(null);
        setError(true);
        alert(
          "No such recipient exists. Please ensure that the patient is registered."
        );
      } else {
        console.error("Error getting data:", error);
      }
    }
    try {
      const person = { hcid: recipient.hcid };
      const response2 = await axios.post(
        "http://localhost:8800/getPerson",
        person
      );
      setInsertionResult2(response2.data);
    } catch (error) {
      if (error.response.status === 409) {
        setInsertionResult2(null);
        setError(true);
        alert(
          "No such recipient exists. Please ensure that the patient is registered."
        );
      } else {
        console.error("Error getting data:", error);
      }
    }
    setShowInfo(true);
  };

  useEffect(() => {
    setShowInfo(false);
  }, [recipient]);

  return (
      <Box sx={{
        background: 'linear-gradient(-45deg, #FFFFFF, #FFB6C1, #FFFFFF)',
        borderRadius: '16px',
        p: 3,
        minHeight: '100vh',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease-in-out infinite',
        '@keyframes gradient': {
          '0%': {backgroundPosition: '0% 50%'},
          '50%': {backgroundPosition: '100% 50%'},
          '100%': {backgroundPosition: '0% 50%'}
        }
      }}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
          <BackButton onClick={handleClickBack}/>
          {showInfo ? (
              <>
                <BloodBondTitle/>
                <RecipientInformation insertionResult={insertionResult} insertionResult2={insertionResult2}/>
                <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      //backgroundColor: '#BF1E2E'
                      backgroundColor: '#BF1E2E',
                      color: '#FFF',
                      fontWeight: 'bold',
                      borderRadius: '30px',
                      fontSize: '1.125rem',
                      textTransform: 'none',
                      padding: '12px 24px',
                      '&:hover': {
                        backgroundColor: '#9E0B20',
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
                      },
                      '&:active': {
                        backgroundColor: '#BF1E2E',
                        boxShadow: 'none',
                      },
                      '&:focus': {
                        boxShadow: '0px 0px 0px 3px rgba(158, 11, 32, 0.5)',
                      },
                    }}
                    onClick={handleBloodRequest}
                >
                  Request Blood
                </Button>

              </>
          ) : (
              <>
                <BloodBondTitle/>
                <Box sx={{
                  background: '#fff',
                  borderRadius: '16px',
                  p: 4,
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
                }}>

                  <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant="h4" sx={{
                      mt: 3,
                      mb: 2,
                      color: '#BF1E2E',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 5px rgba(191, 30, 46, 0.3)',
                    }}>
                      Blood Request
                    </Typography>

                    <Typography variant="body1" sx={{mb: 3, color: '#4F4F4F', fontWeight: 300}}>
                      To retrieve the recipient's information, please enter their healthcare ID in the search field
                      below.
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%'}}>
                      <TextField
                          id="hcid"
                          name="hcid"
                          label="Healthcare ID"
                          variant="outlined"
                          size="small"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                  <MedicalInformationOutlinedIcon sx={{color: '#657786'}}/>
                                </InputAdornment>
                            )
                          }}
                          InputLabelProps={{
                            sx: {
                              color: '#657786',
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              letterSpacing: '0.02857em',
                              '&.Mui-focused': {
                                color: '#BF1E2E',
                              },
                            },
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '30px',
                              '& fieldset': {
                                borderColor: '#657786',
                              },
                              '&:hover fieldset': {
                                borderColor: '#D81F4F',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#D81F4F',
                                borderWidth: '2px',
                              },
                            },
                            //rgb(15, 20, 25) in he
                            '& .MuiInputBase-input': {
                              color: '#14171A',
                              fontSize: '0.875rem',
                              lineHeight: 1.5,
                              letterSpacing: '0.00938em',
                              fontWeight: 500,
                              paddingTop: '16.5px',
                              paddingBottom: '16.5px',
                              paddingLeft: '14px',
                              paddingRight: '14px',
                            },
                            '&:hover .MuiSvgIcon-root': {
                              color: '#BF1E2E',
                            },
                          }}
                          value={recipient.hcid}
                          onChange={handleChange}
                      />

                      <Button
                          variant="contained"
                          sx={{
                            // backgroundColor: '#BF1E2E',
                            backgroundImage: 'linear-gradient(135deg, #BF1E2E, #FF7F7F)',
                            color: '#FFF',
                            fontWeight: 'bold',
                            borderRadius: '30px',
                            fontSize: '1.125rem',
                            textTransform: 'none',
                            // padding: '15px 30px',
                            padding: '12px 24px',
                            margin: '10px 0px',
                            '&:hover': {
                              backgroundColor: '#FF7F7F',
                              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
                            },
                            '&:active': {
                              backgroundColor: '#BF1E2E',
                              boxShadow: 'none',
                            },
                            '&:focus': {
                              boxShadow: '0px 0px 0px 3px rgba(191, 30, 46, 0.5)',
                            },

                          }}

                          onClick={handleClick}
                          fullWidth
                      >
                        Search
                      </Button>
                      {error && (
                          <Typography variant="body2" color="error" sx={{mt: 2}}>
                            The health care ID entered does not match our records. Please try again.
                          </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>

              </>
          )}
        </Box>
      </Box>

  );
};

export default BloodRequest;
