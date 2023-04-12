import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, } from "react-router-dom";

const BloodTransfusion = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dataObject = JSON.parse(new URLSearchParams(location.search).get("data"));
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
  const [error,setError] = useState(false)

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
      const response = await axios.post('http://localhost:8800/checkRecipientExists', { valueToCheck: appt.hcid });
      setCheckResult(response.data.exists);
      if (response.data.exists) {
        await axios.post("http://localhost:8800/bookAppointment", appt);
        navigate("/DoctorHome");
  
        if (dataObject != null) {
          try {
            console.log("changing blood status");
            console.log(dataObject.Blood_ID);
            await axios.post("http://localhost:8800/changeBloodStatus", { Blood_ID: dataObject.Blood_ID });
          } catch (err) {
            console.log(err);
          }
  
          try {
            console.log("changing request status");
            console.log(dataObject.Request_ID);
            await axios.post("http://localhost:8800/changeRequestStatus", { Request_ID: dataObject.Request_ID });
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

    
    {showInfo ? (
  <div>
    <h3>Blood to reserve</h3>
    <p>Blood ID: { dataObject.Blood_ID } for Blood Request ID: { dataObject.Request_ID} for patient with HCID: { dataObject.HCID }</p>
    
  </div>
) : (
  <div></div>
)}

    
    {checkResult !== null && (
        <p>{checkResult ? 'Value exists in database.' : 'Value does not exist in database.'}</p>
    )}
    </div>
  );
};

export default BloodTransfusion;