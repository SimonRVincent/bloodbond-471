import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";

const DonorDate = () => {

  const navigate = useNavigate();

  const [appt, setAppt] = useState({
    firstname: "",
    lastname: "",
    age: null,
    sex: "",
    dob: "",
    phone: null,
    email: "",
    rhfactor: "",
    bloodtype: "",


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
      await axios.post("http://localhost:8800/books", appt);
      navigate("/Donor/DonorAppt/DonorDate");
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
      <h1></h1>
  
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

      <button onClick={handleClick}>Complete booking</button>
      {error && "Something went wrong!"}
    </div>
    </div>
  );
};

export default DonorDate;