import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Doctor = () => {


  const navigate = useNavigate();


  const handleClickDoctor = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/Doctor");
       
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickDonor = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/Donor");
       
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mainDiv">
        <button onClick={handleClickDonor}>Donor</button>
        <button onClick={handleClickDoctor}>Doctor</button>
    </div>
  );
};

export default Doctor;