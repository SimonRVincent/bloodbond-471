import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {


  const navigate = useNavigate();


  const handleClickDoctor = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/books");
       
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickDonor = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/books");
       
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
        <h1>Home</h1>
        <button onClick={handleClickDonor}>Donor</button>
        <button onClick={handleClickDoctor}>Doctor</button>
    </div>
  );
};

export default Home;
