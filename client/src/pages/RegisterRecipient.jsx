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
    age: null,
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
    hcid: null,
    healthcondition: "",
  });



  const handleChange = (e) => {
    setPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setRecipient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

      setInsertionResult(response.data.message);
      try {
        console.log("recipient", recipient);
        await axios.post("http://localhost:8800/addRecipient", recipient);

      } catch (err) {
        console.log(err);
        setError(true)
      }
    } catch (error) {
      if (error.response.status === 409) {
        setInsertionResult(error.response.data.message);
        alert("Insertion failed. Recipient is already registered.");
      } else {
        console.error('Error inserting data:', error);
      }
    }
    alert("Recipient successfully registered.")
    navigate("/DoctorHome");
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
                  Register Recipient
                </Typography>

                <Typography variant="body1" sx={{fontWeight: 'bold', textAlign: 'center', mt: 2}}>
                  To register your patient as a recipient, please provide the patient's information in the form below.
                </Typography>
              </Box>

              <Grid container justifyContent="center" sx={{mt: 4, mb: 4}}>
                <Grid item xs={12} md={8}>
                  <form>
                    <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold', textAlign: 'center'}}>
                      Enter Recipient Information
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
                      <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="healthcondition-label">Medical History and Conditions</InputLabel>
                          <Select
                              labelId="healthcondition-label"
                              label="Medical History and Conditions"
                              name="healthcondition"
                              required
                              value={person.healthcondition}
                              onChange={handleChange}
                              style={{padding: "8px"}}
                              MenuProps={{
                                getContentAnchorEl: null,
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
                                    maxWidth: 600
                                  },
                                },
                              }}
                          >
                            <MenuItem value="">
                              <em>Select a Medical Condition or History</em>
                            </MenuItem>
                            <ListSubheader>Chronic Conditions</ListSubheader>
                            {chronicConditions.map((condition, index) => (
                                <React.Fragment key={condition}>
                                  <MenuItem value={condition}>
                                    {condition}
                                  </MenuItem>
                                  {index !== chronicConditions.length - 1 && <Divider/>}
                                </React.Fragment>
                            ))}
                            <ListSubheader>Acute Conditions</ListSubheader>
                            {acuteConditions.map((condition, index) => (
                                <React.Fragment key={condition}>
                                  <MenuItem value={condition}>
                                    {condition}
                                  </MenuItem>
                                  {index !== acuteConditions.length - 1 && <Divider/>}
                                </React.Fragment>
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