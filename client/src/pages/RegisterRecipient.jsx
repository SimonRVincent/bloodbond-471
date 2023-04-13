import axios from "axios";
import React, {useState} from "react";
import {useNavigate,} from "react-router-dom";
import {BackButton} from "../components/BackButton";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {FemaleOutlined, MaleOutlined} from "@mui/icons-material";
import {BloodBondTitle} from "../components/BloodBondTitle";

const RegisterRecipient = () => {

  const navigate = useNavigate();

  const [person, setPerson] = useState({
    firstname: "",
    lastname: "",
    age: "",
    sex: "",
    dob: "",
    email: "",
    hcid: null,
  });
  const [error,setError] = useState(false)

  // WILL HAVE TO FIGURE OUT HOW WE DEAL WITH BLOOD_ID
  const [recipient, setRecipient] = useState({
    bloodtype: "",
    rhfactor: "",
    hcid: "",
    healthcondition: "",
  });

  const handleChange = (e) => {
    console.log(`Changing ${e.target.name} to ${e.target.value}`);

    setPerson((prevPerson) => {
      const updatedPerson = {...prevPerson, [e.target.name]: e.target.value};
      console.log(`Person's ${e.target.name} is now ${updatedPerson[e.target.name]}`);
      return updatedPerson;
    });

    setRecipient((prevRecipient) => {
      const updatedRecipient = {...prevRecipient, [e.target.name]: e.target.value};
      console.log(`Recipient's ${e.target.name} is now ${updatedRecipient[e.target.name]}`);
      return updatedRecipient;
    });
  };

  const [insertionResult, setInsertionResult] = useState(null);

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
      const response = await axios.post('http://localhost:8800/addPerson', person);
      console.log('Person added:', response.data);

      setInsertionResult(response.data.message);
      try {
        console.log('Recipient:', recipient);
        const recipientResponse = await axios.post("http://localhost:8800/addRecipient", recipient);
        console.log('Recipient added:', recipientResponse.data);

        if (recipientResponse.status !== 200) {
          setError(true);
          console.log('Error adding recipient.');
          return;
        }

      } catch (err) {
        console.log('Error adding recipient:', err);
        setError(true)
      }
    } catch (error) {
      if (error.response.status === 409) {
        setInsertionResult(error.response.data.message);
        console.log('Insertion failed. Recipient is already registered.');
        alert("Insertion failed. Recipient is already registered.");
      } else if (error.response.status === 500) {
        console.log('Error inserting data:', error);
        setError(true);
        alert("An internal server error occurred while registering the recipient. Please try again later, and hopefully the problem will be fixed.");
      } else {
        console.error('Error inserting data:', error);
      }
    }

    if (!error) {
      console.log('Recipient successfully registered.');
      alert("Recipient successfully registered.");
      navigate("/DoctorHome");
    }
  };


  const chronicConditions = [
    'Anemia',
    'Chronic kidney disease',
    'Chronic liver disease',
    'Chronic obstructive pulmonary disease (COPD)',
    'Coronary artery disease (CAD)',
    'Heart failure',
    'Hemophilia',
    'HIV/AIDS',
    'Inflammatory bowel disease (IBD)',
    'Lymphoma',
    'Leukemia',
    'Multiple sclerosis',
    'Multiple myeloma',
    'Sickle cell disease',
    'Thalassemia',
  ];

  const acuteConditions = [
    'Bleeding disorders',
    'Burns',
    'Electrolyte imbalances',
    'Gastrointestinal bleeding',
    'Major surgery',
    'Severe infections',
    'Trauma',
  ];


  return (
      <Box bgcolor="#fff" minHeight="100vh">
        <Container maxWidth="md" sx={{py: 4}}>
          <Grid container justifyContent="center" spacing={2} sx={{mb: 4}}>
            <Grid item xs={12} sm={6}>
              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <BackButton onClick={handleClickBack}/>
                <Box sx={{mb: 2}}>
                  <BloodBondTitle/>
                  <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    fontSize: 'calc(1.75rem + 0.5vw)',
                    color: '#b71c1c',
                    textShadow: '2px 2px 5px #ff9aa2',
                    textAlign: 'center'
                  }}>
                    Register Recipient
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{fontWeight: 'bold', textAlign: 'center', mb: 2}}>
                  To register your patient as a recipient, please provide the patient's information in the form below.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={10} sm={11} sx={{my: 2}}>
              <Grid container justifyContent="center">
                <Grid item xs={12}>
                  <form>
                    <Typography variant="h4" sx={{
                      mb: 4,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      '@media (max-width:600px)': {fontSize: '1.5rem'}
                    }}>
                      Enter Recipient Information
                    </Typography>
                    <Typography variant="h5"
                                sx={{fontWeight: 'bold', mb: 2, '@media (max-width:600px)': {fontSize: '1.2rem'}}}>
                      Personal Information
                    </Typography>
                    <Grid container spacing={2}>

                      <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            variant="outlined"
                            name="firstname"
                            required
                            value={person.firstname}
                            onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            variant="outlined"
                            name="lastname"
                            required
                            value={person.lastname}
                            onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Date of Birth"
                            variant="outlined"
                            name="dob"
                            type="date"
                            required
                            value={person.dob}
                            onChange={(e) => {
                              const dob = new Date(e.target.value);
                              const today = new Date();
                              let age = today.getFullYear() - dob.getFullYear();
                              const birthMonth = dob.getMonth();
                              const currentMonth = today.getMonth();
                              if (currentMonth < birthMonth) {
                                age--;
                              } else if (currentMonth === birthMonth) {
                                const birthDay = dob.getDate();
                                const currentDay = today.getDate();
                                if (currentDay < birthDay) {
                                  age--;
                                }
                              }
                              setPerson(prevPerson => {
                                const updatedAge = age.toString();
                                console.log(`Updating person's date of birth to ${e.target.value} and age to ${updatedAge}`);
                                return {
                                  ...prevPerson,
                                  dob: e.target.value,
                                  age: updatedAge
                                };
                              });
                            }}

                            InputLabelProps={{shrink: true}}
                            sx={{py: 1}}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Sex</InputLabel>
                          <Select
                              label="Sex"
                              name="sex"
                              required
                              value={person.sex}
                              onChange={handleChange}
                          >
                            <MenuItem value="male">
                              <IconButton size="small">
                                <MaleOutlined/>
                              </IconButton>
                              Male
                            </MenuItem>
                            <MenuItem value="female">
                              <IconButton size="small">
                                <FemaleOutlined/>
                              </IconButton>
                              Female
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            name="email"
                            type="email"
                            value={person.email}
                            onChange={handleChange}
                            required
                            error={Boolean(person.email) && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(person.email)}
                            helperText={
                              Boolean(person.email) && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(person.email)
                                  ? "Please enter a valid email address"
                                  : null
                            }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h5" sx={{
                          fontWeight: 'bold',
                          mt: {xs: 2, sm: 0},
                          fontSize: {xs: '1.2rem', sm: '1.5rem'}
                        }}>
                          Medical Information
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Health Care ID"
                            variant="outlined"
                            required
                            name="hcid"
                            value={person.hcid}
                            onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Blood Type</InputLabel>
                          <Select
                              label="Blood Type"
                              name="bloodtype"
                              required
                              value={recipient.bloodtype}
                              onChange={handleChange}
                          >
                            {["A", "B", "AB", "O"].map((type) => (
                                <MenuItem key={type} value={type}>
                                  {type}
                                </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>RH Factor</InputLabel>
                          <Select
                              label="RH Factor"
                              name="rhfactor"
                              required
                              value={recipient.rhfactor}
                              onChange={handleChange}
                          >
                            <MenuItem value="+">+</MenuItem>
                            <MenuItem value="-">-</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="healthcondition-label">Medical History and Conditions</InputLabel>
                          <Select
                              labelId="healthcondition-label"
                              id="healthcondition"
                              name="healthcondition"
                              value={recipient.healthcondition}
                              onChange={handleChange}
                              label="Medical History and Conditions"
                              required
                              style={{padding: "8px"}}
                              MenuProps={{
                                anchorOrigin: {
                                  vertical: "bottom",
                                  horizontal: "left"
                                },
                                transformOrigin: {
                                  vertical: "top",
                                  horizontal: "left"
                                },
                                PaperProps: {
                                  style: {
                                    maxHeight: 300,
                                    width: "100%",
                                    maxWidth: 600,
                                    marginTop: "10px"
                                  }
                                }
                              }}
                          >
                            <MenuItem value="">
                              <em>Select a Medical Condition or History</em>
                            </MenuItem>
                            <ListSubheader>Chronic Conditions</ListSubheader>
                            {chronicConditions.map((condition, index) => (
                                <MenuItem key={condition} value={condition}>
                                  {condition}
                                  {index !== chronicConditions.length - 1 && <Divider/>}
                                </MenuItem>
                            ))}
                            <ListSubheader>Acute Conditions</ListSubheader>
                            {acuteConditions.map((condition, index) => (
                                <MenuItem key={condition} value={condition}>
                                  {condition}
                                  {index !== acuteConditions.length - 1 && <Divider/>}
                                </MenuItem>
                            ))}
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Box my={4} display="flex" justifyContent="center">
                      <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={handleClick}
                          sx={{
                            borderRadius: "9999px",
                            bgcolor: "#b71c1c", // Blood red color code
                            color: "#fff",
                            textTransform: "none",
                            fontWeight: 700,
                            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: "#8c1b1b", // Darker shade of blood red
                              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.16)",
                            },
                            "@media (max-width: 600px)": {
                              width: "100%",
                            },
                          }}
                      >
                        Register Recipient
                      </Button>
                    </Box>
                    {error && (
                        <Typography variant="body1" color="error">
                          Something went wrong!
                        </Typography>
                    )}
                    {insertionResult && (
                        <Typography variant="body1">{insertionResult}</Typography>
                    )}
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
  );
};

export default RegisterRecipient;