import axios from "axios";
import React, {useState} from "react";
import {useNavigate,} from "react-router-dom";
import {gradientAnimation} from "../components/GradientAnimationKeyframe";
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {BloodBondTitle} from "../components/BloodBondTitle";
import {BackButton} from "../components/BackButton";
import {RedTextField} from "../components/RedTextField";


const LogTransfusion = () => {

    const navigate = useNavigate();

    const [transfusionhistory, setTransfusionHistory] = useState({
        hcid: null,
        dateoftransfusion: "",

      transfusionstatus: "",
      bloodid: "",

  });

    

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

    const handleChange = (e) => {
      setTransfusionHistory((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    // Delete from blood inventory if the transfusion was complete
    const handleComplete= async (id) =>{
      try{
        await axios.delete("http://localhost:8800/deleteinventory/"+id);
        await axios.post("http://localhost:8800/addtransfusionhistory", transfusionhistory);
        await axios.put("http://localhost:8800/updateblood/"+id);
        window.location.reload()
      }
      catch(eer){
        console.log(eer);
      }
    }

    const handleIncomplete= async (id) =>{
      try{
        await axios.delete("http://localhost:8800/deleteinventory/"+id);
        await axios.put("http://localhost:8800/updateblood/"+id);
        window.location.reload()
      }
      catch(eer){
        console.log(eer);
      }
    }


    return (

        //  <div className="mainDiv">
        //
        //  <div className="header">
        //      <button className="backButton" onClick={handleClickBack}>Back</button>
        //  Logo here
        //  </div>
        //
        //  <div className = "LogTransfusion">
        //   <h1> Log Transfusion </h1>
        //
        //  <input type="text" placeholder="Recipient HCID" name="hcid" onChange={handleChange}/>
        //
        //  <br></br>
        //  <br></br>
        //
        //  <input type="text" placeholder="Blood ID" name = "bloodid"  onChange={handleChange} />
        //
        //  <label>
        //    Transfusion Date:
        //  <input type="date" placeholder="Transfusion Date" name = "dateoftransfusion"  onChange={handleChange} />
        //  </label>
        //
        //  <br></br>
        //  <br></br>
        //
        //  <label>
        //  Status:
        //      <button classname="Complete" onClick={() => handleComplete(transfusionhistory.bloodid)}> Complete</button>
        //      <button classname="Incomplete" onClick={() => handleIncomplete(transfusionhistory.bloodid)}> Incomplete</button>
        //  </label>
        //   </div>
        //
        //   </div>
        // );

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
                    Log Transfusion
                </Typography>
                <Typography sx={{
                    fontSize: ["1.25rem", "1.5rem", "1.75rem"],
                    lineHeight: "1.5",
                    mb: "2rem",
                    color: "grey.600",
                    fontWeight: "300"
                }}>
                    Please enter the details of the transfusion below.
                </Typography>
                <form onSubmit={handleComplete}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="recipient-hcid"
                                label="Recipient HCID"
                                type="text"
                                placeholder="Recipient HCID"
                                name="hcid"
                                sx={RedTextField}
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                // this will be the date when the blood is transfused
                                id="date-of-transfusion"
                                name="dateoftransfusion"
                                label="Date of Transfusion"
                                type="date"
                                placeholder="Date of Transfusion"


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


                        {/*<Grid container justifyContent="center" alignItems="center">*/}
                        {/*    <Box sx={{backgroundColor: 'transparent', marginTop: '2rem'}}>*/}
                        {/*        <Grid item xs={12} sm={12}>*/}
                        {/*            <FormControl component="fieldset" sx={{*/}
                        {/*                width: '100%', '& label': { color: '#757575', fontWeight: 'bold',*/}
                        {/*                    marginBottom: '8px',*/}
                        {/*                    '&:hover': { color: '#B71C1C' }, '&.Mui-focused': { color: '#B71C1C' } }, '& .Mui-checked': { color: '#B71C1C' } }}>*/}
                        {/*                <FormLabel component="legend" sx={{ color: '#757575', fontWeight: 'bold', marginBottom: '8px' , '&:hover': { color: '#B71C1C' }, '&.Mui-focused': { color: '#B71C1C' } }}>Status</FormLabel>*/}
                        {/*                <RadioGroup*/}
                        {/*                    // this is complete or incomplete*/}
                        {/*                    aria-label="status"*/}
                        {/*                    name="status"*/}
                        {/*                    value={transfusionhistory.status}*/}
                        {/*                    onChange={handleChange}*/}
                        {/*                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}*/}

                        {/*                >*/}
                        {/*                    <FormControlLabel value="Available" control={<Radio sx={{ color: '#B71C1C' }} />} label="Complete" />*/}
                        {/*                    <FormControlLabel value="Unavailable" control={<Radio sx={{ color: '#B71C1C' }} />} label="Incomplete" />*/}
                        {/*                </RadioGroup>*/}
                        {/*            </FormControl>*/}
                        {/*        </Grid>*/}
                        {/*    </Box>*/}
                        {/*</Grid>*/}

                        <Grid container justifyContent="center" alignItems="center">
                            <Box sx={{
                                backgroundColor: 'transparent',
                                marginTop: '2rem',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <FormControl component="fieldset" sx={{width: '100%'}}>
                                    <FormLabel component="legend" sx={{
                                        color: '#1C1C1C',
                                        fontWeight: 'bold',
                                        marginBottom: '8px',
                                        '&:hover': {color: '#B71C1C'},
                                        '&.Mui-focused': {color: '#B71C1C'}
                                    }}>
                                        Status
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="status"
                                        name="status"
                                        value={transfusionhistory.status}
                                        onChange={handleChange}
                                        sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
                                    >
                                        <FormControlLabel
                                            value="Complete"
                                            control={<Radio sx={{color: '#B71C1C'}}/>}
                                            label="Complete"
                                            sx={{color: transfusionhistory.status === 'Complete' ? '#B71C1C' : '#616161'}}
                                        />
                                        <FormControlLabel
                                            value="Incomplete"
                                            control={<Radio sx={{color: '#B71C1C'}}/>}
                                            label="Incomplete"
                                            sx={{color: transfusionhistory.status === 'Incomplete' ? '#B71C1C' : '#616161'}}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Grid>


                        <Grid item xs={12}>
                            {/*<Box sx={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>*/}

                            {/*    <BloodButton children={"Log Donation"} onClick={handleClick} />*/}
                            {/*</Box>*/}
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );


};

export default LogTransfusion;