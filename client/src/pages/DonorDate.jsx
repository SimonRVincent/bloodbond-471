import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";
import { useLocation } from "react-router-dom";

const DonorDate = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const hcid = location.state.hcid;

  const [appt, setAppt] = useState({
    date: null,
    time: null,
    location: "",
    hcid: hcid,
    confirmationid: null,
    status: 0,


  });
  const [error,setError] = useState(false)


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
        // ** HAVE TO EDITN THIS HERE TO POST TO DATABASE **
      await axios.post("http://localhost:8800/bookAppointment", appt);
      navigate("/");
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
    </div>
  );
};

export default DonorDate;