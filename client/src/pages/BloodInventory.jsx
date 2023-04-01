import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";

const BloodInventory = () => {

  const navigate = useNavigate();

  const [appt, setAppt] = useState({
    date: null,
    time: null,


  });
  const [error,setError] = useState(false)


  const handleChange = (e) => {
    setAppt((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
        // ** HAVE TO EDITN THIS HERE TO POST TO DATABASE **
      await axios.post("http://localhost:8800/books", appt);
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

      <button onClick={handleClick}>Book transfusion</button>
      {error && "Something went wrong!"}
    </div>
    </div>
  );
};

export default BloodInventory;