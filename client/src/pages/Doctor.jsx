import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";

const Doctor = () => {

  const navigate = useNavigate();

  const [dID, setDID] = useState({
    dID: "",

  });
  const [error,setError] = useState(false)


  const handleChange = (e) => {
    setDID((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      await axios.post("http://localhost:8800/books", dID);
      navigate("/DoctorHome");
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
      <h1>Enter Doctor ID</h1>
  
      <input
        type="text"
        placeholder="Doctor ID"
        name="dID"
        onChange={handleChange}
      />

      <button onClick={handleClick}>Login</button>
      {error && "Something went wrong!"}
    </div>
    </div>
  );
};

export default Doctor;