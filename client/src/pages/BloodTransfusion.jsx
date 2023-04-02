import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";

const BloodTransfusion = () => {

  const navigate = useNavigate();

  const [appt, setAppt] = useState({
    date: null,
    time: null,
    location: "",
    hcid: null,
    confirmationid: null,
    status: 0,


  });
  const [error,setError] = useState(false)

  const [checkResult, setCheckResult] = useState(null);

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
      // If it doesn't exist then return error and notify user
      // If it does exist then continue with booking
      const response = await axios.post('http://localhost:8800/checkRecipientExists', appt.hcid);
      setCheckResult(response.data.exists);
      if (response.data.exists) {
        await axios.post("http://localhost:8800/bookAppointment", appt);
        navigate("/");
      } else {
        alert("HCID not found. Please register recipient.");
      }
    } catch (err) {
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
      <div className="form">

      <input
        type="text"
        placeholder="Health care ID"
        name="hcid"
        onChange={handleChange}
      />
  
      <input
        type="date"
        placeholder="Date"
        name="date"
        onChange={handleChange}
      />
      
      <input
        type="time"
        placeholder="Time"
        name="time"
        onChange={handleChange}
      />

      <label>
        Location:
        <select name="location" onChange={handleChange}>
          <option value="">Select location</option>
          <option value="St_Johns">St. John's Hospital</option>
          <option value="Stevenson">Stevenson Ave Health Clinic</option>
          <option value="McDougall">McDougal Medical Centre</option>
        </select>
      </label>
        


      <button onClick={handleClick}>Complete booking</button>
      {error && "Something went wrong!"}
    </div>
    {checkResult !== null && (
        <p>{checkResult ? 'Value exists in database.' : 'Value does not exist in database.'}</p>
    )}
    </div>
  );
};

export default BloodTransfusion;