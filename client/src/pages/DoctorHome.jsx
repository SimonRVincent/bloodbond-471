
import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorHome = () => {


  const navigate = useNavigate();

  const handleClickBack = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/");

    } catch (err) {
      console.log(err);
    }
  };

  const handleClickRegReci = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/DoctorHome/RegisterRecipient");
       
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickLogDonation = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/DonctorHome/LogDonation");
       
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickBloodReq = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/DoctorHome/BloodRequest");
       
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickBookTransf = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/DoctorHome/BloodTransfusion");
       
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickBloodInv = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/DoctorHome/BloodInventory");
       
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
        <button onClick={handleClickRegReci}>Register recipient</button>
        <button onClick={handleClickLogDonation}>Log donation</button>
        <button onClick={handleClickBloodReq}>Blood request</button>
        <button onClick={handleClickBookTransf}>Book transfusion</button>
        <button onClick={handleClickBloodInv}>Blood inventory</button>
    </div>
  );
};

export default DoctorHome;