import axios from "axios";
import React, {useState} from "react";
import {useNavigate,} from "react-router-dom";
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {LocalHospitalOutlined} from "@mui/icons-material";
import {BloodFormControlStyle} from "../components/BloodFormControlStyle";
import {RedTextField} from "../components/RedTextField";
import {CountTextField} from "../components/CountTextField";
import {BloodBondTitle} from "../components/BloodBondTitle";
import {BackButton} from "../components/BackButton";
import {BloodButton} from "../components/BloodButton";
import {gradientAnimation} from "../components/GradientAnimationKeyframe";


const LogDonation = () => {

    const navigate = useNavigate();

    const [error, setError] = useState(false)

    const [blood, setBlood] = useState({
        bloodid: null,
        bloodgroup: "",
        rhfactor: "",
        bloodstatus: "",
        redbloodcells: null,
        whitebloodcells: null,
        platelets: null,
        bloodvolume: null,

    });

    const [donationhistory, setDonationHistory] = useState({
        hcid: null,
        dateofdonation: "",
    });

    const [bloodinventory, setBloodInventory] = useState({
        hospitalid: null,
        bloodid: null,
        dateofdonation: "",
        expirationdate: "",

        bloodstatus: "",
        

    });


    const handleChange = (e) => {
        setDonationHistory((prev) => ({...prev, [e.target.name]: e.target.value}));
        setBlood((prev) => ({...prev, [e.target.name]: e.target.value}));
        setBloodInventory((prev) => ({...prev, [e.target.name]: e.target.value}));
     }

    const [insertionResult, setInsertionResult] = useState(null);


    // Handle the buttons 
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

        const expirationDate = new Date(donationhistory.dateofdonation);
        expirationDate.setDate(expirationDate.getDate() + 43);
        bloodinventory.expirationdate = expirationDate.toISOString().slice(0, 10);
        

        try{
            await axios.post("http://localhost:8800/addBlood", blood);
            await axios.post("http://localhost:8800/addDonationHistory", donationhistory);
            
            if(bloodinventory.bloodstatus === "Available"){
                await axios.post("http://localhost:8800/addBloodInventory", bloodinventory);
            }

            navigate("/DoctorHome");
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

        //   <div className="mainDiv">
        //
        //   <div className="header">
        //       <button className="backButton" onClick={handleClickBack}>Back</button>
        //   </div>
        //
        //  <div className = "LogDonation">
        //  <h1>  Log Donation </h1>
        //
        //   <input type="text" placeholder="Donor HCID" name="hcid" onChange={handleChange}/>
        //
        //   <label>
        //       Collection Date:
        //   <input type="date" placeholder="Collection Date" name = "dateofdonation"  onChange={handleChange} />
        //   </label>
        //
        //   <br></br>
        //   <br></br>
        //
        //   <input type="text" placeholder="Blood ID" name = "bloodid" onChange={handleChange}/>
        //   <input type="text" placeholder="Blood type" name = "bloodgroup" onChange={handleChange} />
        //
        //   <input type="text" placeholder="RH factor" name = "rhfactor" onChange={handleChange} />
        //   <input type="text" placeholder="Red blood cell count" name = "redbloodcells" onChange={handleChange} />
        //   <input type="text" placeholder="White blood cell count" name = "whitebloodcells" onChange={handleChange} />
        //   <input type="text" placeholder="Platelet count" name = "platelets" onChange={handleChange} />
        //   <input type="text" placeholder="Blood volume" name = "bloodvolume" onChange={handleChange} />
        //
        //   <label>
        //   Status:
        //       <select name="bloodstatus" onChange={handleChange}>
        //        <option value="">Select Availablity</option>
        //        <option value="Available">Available</option>
        //        <option value="Unavilable">Unavailable</option>
        //       </select>
        //   </label>
        //
        //
        //   <br></br>
        //   <br></br>
        //
        //   <label>
        //   Going to:
        //       <select name = "hospitalid" onChange={handleChange}>
        //        <option value="">Select hospital</option>
        //        <option value="1234">Peter Lougheed Hospital</option>
        //        <option value="5678">Foothills Hospital</option>
        //        <option value="9012">RockeyView Hospital</option>
        //        <option value="3456">Alberta Children's Hospital</option>
        //       </select>
        //   </label>
        //
        //
        //   <br></br>
        //   <br></br>
        //
        //   <button onClick={handleClick}> Submit Information </button>
        //
        //   </div>
        //
        //   {insertionResult && <p>{insertionResult}</p>}
        //
        //   </div>
        // );
        // Make a Form in Material UI that looks like blood.ca forms, and make the fields user friendly and clickable, there should be minimal typing

        <Grid container sx={{
            width: "100%",
            minHeight: "100vh",
            backgroundImage: 'linear-gradient(to bottom right, #FFFFFF, #E6B0B3)',
            // use gradientAnimation to make the gradient move
            backgroundRepeat: "no-repeat",
            animation: `${gradientAnimation} 10s ease infinite`,
            backgroundSize: "cover",
            padding: {xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem"},
        }}>


            <Grid item sx={{width: "100%"}}>
                <BloodBondTitle/>
                <BackButton onClick={handleClickBack}/>
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        fontWeight: "bold",
                        color: "#B71C1C",
                        my: "2rem",
                        borderBottom: "3px solid #B71C1C",
                        paddingBottom: "1rem",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1), 2px 2px 4px rgba(0, 0, 0, 0.1), 4px 4px 8px rgba(0, 0, 0, 0.1)",
                        fontSize: "2rem",
                        "@media (min-width: 600px)": {
                            fontSize: "3rem",
                        },
                        "@media (min-width: 960px)": {
                            fontSize: "4rem",
                        },
                    }}
                >
                    Log Blood Donation
                </Typography>
                <Typography sx={{
                    fontSize: ["1.25rem", "1.5rem", "1.75rem"],
                    lineHeight: "1.5",
                    mb: "2rem",
                    color: "grey.600",
                    fontWeight: "300"
                }}>
                    Please fill out the following information to log a recent blood donation.
                </Typography>
                <form onSubmit={handleClick}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Donor HCID"
                                placeholder="Donor HCID"
                                name="hcid"
                                fullWidth
                                sx={RedTextField}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="date-of-collection"
                                label="Collection Date"
                                type="date"
                                placeholder="Collection Date"
                                name="dateofdonation"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{
                                    min: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                                    max: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#B71C1C',
                                    },
                                    '& .MuiOutlinedInput-root:focus .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#B71C1C',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#B71C1C',
                                    },
                                    '& .MuiInputLabel-root:hover': {
                                        color: '#B71C1C',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#B71C1C',
                                    },


                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                label="Blood ID"
                                placeholder="Blood ID"
                                name="bloodid"
                                fullWidth
                                sx={RedTextField}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} md={2}>
                            <FormControl fullWidth sx={BloodFormControlStyle}>
                                <InputLabel id="bloodgroup-label">Blood Type</InputLabel>
                                <Select
                                    labelId="bloodgroup-label"
                                    id="bloodgroup"
                                    name="bloodgroup"
                                    onChange={handleChange}
                                    label="Blood Type"
                                >
                                    <MenuItem value="A">A</MenuItem>
                                    <MenuItem value="B">B</MenuItem>
                                    <MenuItem value="AB">AB</MenuItem>
                                    <MenuItem value="O">O</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={3} md={2}>
                            <FormControl fullWidth sx={BloodFormControlStyle}>
                                <InputLabel id="rhfactor-label">RH Factor</InputLabel>
                                <Select
                                    labelId="rhfactor-label"
                                    id="rhfactor"
                                    name="rhfactor"
                                    onChange={handleChange}
                                    label="RH Factor"
                                >
                                    <MenuItem value="+">+</MenuItem>
                                    <MenuItem value="-">-</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <CountTextField
                            label="Blood Volume"
                            placeholder="e.g. 5000 mL"
                            name="bloodvolume"
                            suffix="mL"
                            onChange={handleChange}
                        />
                        <CountTextField
                            label="Red Blood Cells"
                            placeholder="e.g. 4.5 x10⁶/μL"
                            name="redbloodcells"
                            suffix="x10⁶/μL"
                            onChange={handleChange}
                        />
                        <CountTextField
                            label="White Blood Cells"
                            placeholder="e.g. 7.5 x10³/μL"
                            name="whitebloodcells"
                            suffix="x10³/μL"
                            onChange={handleChange}
                        />
                        <CountTextField
                            label="Platelet Count"
                            placeholder="e.g. 250 x10³/μL"
                            name="platelets"
                            suffix="x10³/μL"
                            onChange={handleChange}
                        />
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={BloodFormControlStyle}>
                                <InputLabel id="hospitalid-label" sx={{'&.Mui-focused': {color: '#B71C1C'}}}>
                                    Going to
                                </InputLabel>
                                <Select
                                    labelId="hospitalid-label"
                                    id="hospitalid"
                                    name="hospitalid"
                                    // value={bloodinventory.hospitalid}
                                    label="Going to"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LocalHospitalOutlined style={{color: '#B71C1C'}}/>
                                        </InputAdornment>
                                    }
                                    onChange={handleChange}
                                    sx={{'&.MuiInputBase-root': {color: '#B71C1C'}}}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"1234"}>Peter Lougheed Hospital</MenuItem>
                                    <MenuItem value={"5678"}>Foothills Hospital</MenuItem>
                                    <MenuItem value={"9012"}>RockyView Hospital</MenuItem>
                                    <MenuItem value={"3456"}>Alberta Children's Hospital</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid container justifyContent="center" alignItems="center">
                            <Box sx={{backgroundColor: 'transparent', marginTop: '2rem'}}>
                                <Grid item xs={12} sm={12}>
                                    <FormControl component="fieldset" sx={{
                                        width: '100%', '& label': {
                                            color: '#757575', fontWeight: 'bold',
                                            marginBottom: '8px',
                                            '&:hover': {color: '#B71C1C'}, '&.Mui-focused': {color: '#B71C1C'}
                                        }, '& .Mui-checked': {color: '#B71C1C'}
                                    }}>
                                        <FormLabel component="legend" sx={{
                                            color: '#757575',
                                            fontWeight: 'bold',
                                            marginBottom: '8px',
                                            '&:hover': {color: '#B71C1C'},
                                            '&.Mui-focused': {color: '#B71C1C'}
                                        }}>Status</FormLabel>
                                        <RadioGroup
                                            aria-label="Status"
                                            name="bloodstatus"
                                            value={bloodinventory.bloodstatus}
                                            onChange={handleChange}
                                            row
                                        >
                                            <FormControlLabel value="Available"
                                                              control={<Radio sx={{color: '#B71C1C'}}/>}
                                                              label="Available" sx={{marginRight: '24px'}}/>
                                            <FormControlLabel value="Unavailable"
                                                              control={<Radio sx={{color: '#B71C1C'}}/>}
                                                              label="Unavailable"/>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Box>
                        </Grid>


                        <Grid item xs={12}>
                            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>

                                <BloodButton children={"Log Donation"} onClick={handleClick}/>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );

    }

export default LogDonation;