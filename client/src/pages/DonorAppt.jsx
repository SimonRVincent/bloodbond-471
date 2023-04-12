import axios from "axios";
import React, {useState} from "react";
import {useNavigate,} from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {BackButton} from "../components/BackButton";
import {BloodBondTitle} from "../components/BloodBondTitle";
import {Cancel, FemaleOutlined, MaleOutlined} from "@mui/icons-material";

const EligibilityRequirements = () => {
  const requirements = [
    "Have tested positive for HIV or AIDS",
    "Have a history of hepatitis B or C",
    "Have had certain types of cancer",
    "Have a history of heart disease or stroke",
    "Have a history of malaria",
    "Have a history of intravenous drug use"
  ];

  return (
      <Box sx={{mt: 3.5}}>
        <Typography variant="h5" sx={{fontWeight: 'bold'}}>
          Eligibility Requirements
        </Typography>
        <Divider sx={{mt: 2, mb: 2}}/>
        <Typography variant="body1" sx={{mt: 1.5}}>
          Please keep in mind that you are ineligible to donate if any of the following apply to you:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List sx={{pl: 3}}>
              {requirements.slice(0, 3).map((req, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Cancel color="error"/>
                    </ListItemIcon>
                    <ListItemText primary={req}/>
                  </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List sx={{pl: 3}}>
              {requirements.slice(3).map((req, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Cancel color="error"/>
                    </ListItemIcon>
                    <ListItemText primary={req}/>
                  </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
  );
};

const DonorAppt = () => {

  const navigate = useNavigate();

  const [person, setPerson] = useState({
    firstname: "",
    lastname: "",
    age: null,
    sex: "",
    dob: "",
    email: "",
    hcid: null,

  });
  const [error,setError] = useState(false)

  // WILL HAVE TO FIGURE OUT HOW WE DEAL WITH BLOOD_ID
  const [donor, setDonor] = useState({
    bloodtype: "",
    rhfactor: "",
    donorstat: null,
    hcid: null,
  });



  const handleChange = (e) => {
    setPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setDonor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [insertionResult, setInsertionResult] = useState(null);

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

      const response = await axios.post('http://localhost:8800/addPerson', person);

      setInsertionResult(response.data.message);
      try {
        await axios.post("http://localhost:8800/addDonor", donor);
        navigate("/Donor/DonorAppt/DonorDate", { state: { hcid: person.hcid } });

      } catch (err) {
        console.log(err);
        setError(true)
      }
    } catch (error) {
      if (error.response.status === 409) {
        setInsertionResult(error.response.data.message);
        alert("Donor is already registered. Proceeding to booking.");
        navigate("/Donor/DonorAppt/DonorDate");
      } else {
        console.error('Error inserting data:', error);
      }
    }
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:8800/checkHcidExists', {
  //       person,
  //     });
  //     if (response.data.exists) {
  //       alert("Patient is already registered. Proceeding to booking.");
  //       navigate("/Donor/DonorAppt/DonorDate");
  //     } else {
  //       try {
  //         await axios.post("http://localhost:8800/addPerson", person);
  //         // If successful, do next post request
    
  //         await axios.post("https://localhost:8800/addDonor", donor);
  //         navigate("/Donor/DonorAppt/DonorDate");
  //       } catch (err) {
  //         console.log(err);
  //         setError(true)
  //       }
  //     };
  //     } catch (error) {
  //     console.error('Error checking existence:', error);
  //   }
  // };


  return (
      <Box bgcolor="#fff" minHeight="100vh">
        <Container maxWidth="md" sx={{py: 4}}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={2} sx={{mb: 4}}>
            <Grid item xs={2} sm={1}>
              <BackButton onClick={handleClickBack}/>
            </Grid>
            <Grid item xs={8} sm={10}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
                <BloodBondTitle/>
                <Typography variant="h5" sx={{
                  fontWeight: 'bold',
                  mt: 2,
                  fontSize: 'calc(1.75rem + 0.5vw)',
                  color: '#b71c1c',
                  textShadow: '2px 2px 5px #ff9aa2'
                }}>
                  Donor Registration
                </Typography>

                <Typography variant="body1" sx={{fontWeight: 'bold', textAlign: 'center', mt: 2}}>
                  Thank you for your interest in donating blood. Please fill out the form below to register as a donor.
                </Typography>
              </Box>
              <EligibilityRequirements/>
              <Grid container justifyContent="center" sx={{mt: 4, mb: 4}}>
                <Grid item xs={12} md={8}>
                  <form>
                    <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold', textAlign: 'center'}}>
                      Enter Donor Information
                    </Typography>
                    <Typography variant="h5" sx={{fontWeight: 'bold', mb: 2}}>
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
                              const age = today.getFullYear() - dob.getFullYear();
                              handleChange({target: {name: "dob", value: e.target.value}});
                              handleChange({target: {name: "age", value: age}});
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
                        <Typography variant="h5" sx={{fontWeight: 'bold', mt: 2}}>
                          Medical Information
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Health Care ID"
                            variant="outlined"
                            required
                            name="healthcareid"
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
                              value={person.bloodtype}
                              onChange={handleChange}
                          >
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                            <MenuItem value="AB">AB</MenuItem>
                            <MenuItem value="O">O</MenuItem>
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
                              value={person.rhfactor}
                              onChange={handleChange}
                          >
                            <MenuItem value="+">+</MenuItem>
                            <MenuItem value="-">-</MenuItem>
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
                        Continue to Booking
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

export default DonorAppt;