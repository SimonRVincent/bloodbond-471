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
        setBloodInventory((prev) => ({...prev, expirationdate: expirationDate.toISOString().slice(0,10), [e.target.name]: e.target.value}));
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

        try{
            await axios.post("http://localhost:8800/addBlood", blood);
            await axios.post("http://localhost:8800/addDonationHistory", donationhistory);
            
            if(bloodinventory.bloodstatus === "Available"){
                await axios.post("http://localhost:8800/addBloodInventory", bloodinventory);
            }

            navigate("/DoctorHome");
        }
        catch(err){
            console.log(err);
            setError(true)
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

        <input type="text" placeholder="Donor HCID" name="hcid" onChange={handleChange}/>
        
        <label>
            Collection Date:
        <input type="date" placeholder="Collection Date" name = "dateofdonation"  onChange={handleChange} />
        </label>

        <br></br>
        <br></br>

        <input type="text" placeholder="Blood ID" name = "bloodid" onChange={handleChange}/>
        <input type="text" placeholder="Blood type" name = "bloodgroup" onChange={handleChange} />

        <input type="text" placeholder="RH factor" name = "rhfactor" onChange={handleChange} />
        <input type="text" placeholder="Red blood cell count" name = "redbloodcells" onChange={handleChange} />
        <input type="text" placeholder="White blood cell count" name = "whitebloodcells" onChange={handleChange} />
        <input type="text" placeholder="Platelet count" name = "platelets" onChange={handleChange} />
        <input type="text" placeholder="Blood volume" name = "bloodvolume" onChange={handleChange} />

        <label>
        Status:
            <select name="bloodstatus" onChange={handleChange}>
             <option value="">Select Availablity</option>
             <option value="Available">Available</option>
             <option value="Unavilable">Unavailable</option>
            </select>
        </label>


        <br></br>
        <br></br>

        <label>
        Going to:
            <select name = "hospitalid" onChange={handleChange}>
             <option value="">Select hospital</option>
             <option value="1234">Peter Lougheed Hospital</option>
             <option value="5678">Foothills Hospital</option>
             <option value="9012">RockeyView Hospital</option>
             <option value="3456">Alberta Children's Hospital</option>
            </select>
        </label>
        

        <br></br>
        <br></br>

        <button onClick={handleClick}> Submit Information </button>

        </div>

        {insertionResult && <p>{insertionResult}</p>}

        </div>
      );

    }

export default LogDonation;



