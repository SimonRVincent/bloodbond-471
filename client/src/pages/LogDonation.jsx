import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";

const LogDonation = () => {

    const navigate = useNavigate();

    const [error,setError] = useState(false)

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
        hospitalid: null,
        donationid: null,
        status: "",
    });


    const handleChange = (e) => {
        setDonationHistory((prev) => ({...prev, [e.target.name]: e.target.value}));
        setBlood((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

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



    return (

        <div className="mainDiv">

        <div className="header">
            <button className="backButton" onClick={handleClickBack}>Back</button>
        Logo here
        </div>

       <div className = "LogDonation"> 
       <h1>  Log Donation </h1> 

        <input type="text" placeholder="Donor HCID" />
        <input type="text" placeholder="Collection Date" />

        <br></br>
        <br></br>

        <input type="text" placeholder="Blood ID" name = "bloodid" onChange={handleChange}/>
        <input type="text" placeholder="Blood type" name = "bloodgroup" onChange={handleChange} />

        <input type="text" placeholder="RH factor" name = "rhfactor" onChange={handleChange} />
        <input type="text" placeholder="Red blood cell count" name = "redbloodcells" onChange={handleChange} />
        <input type="text" placeholder="White blood cell count" name = "whitebloodcells" onChange={handleChange} />
        <input type="text" placeholder="Platelet count" name = "platelets" onChange={handleChange} />
        <input type="text" placeholder="Blood volume" name = "bloodvolume" onChange={handleChange} />


        </div>

        </div>
      );
};

export default LogDonation;



