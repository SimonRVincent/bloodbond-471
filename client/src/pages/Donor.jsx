import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";

const Donor = () => {


  const navigate = useNavigate();


  const handleClickDonorAppt = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/Donor/DonorAppt");
       
    } catch (err) {
      console.log(err);
    }
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

  return (
    <div className="mainDiv">
            <div className="header">
        <button className="backButton" onClick={handleClickBack}>Back</button>
        Logo here
      </div>
        <button onClick={handleClickDonorAppt}>Book Donation Appointment</button>
    </div>
  );
};

export default Donor;