import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BloodRequestInfo from "./BloodRequestInfo";

const BloodRequestResult = () => {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState({ hcid: null });
  const [insertionResult, setInsertionResult] = useState(null);
  const [error, setError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const location = useLocation();
  const result = JSON.parse(new URLSearchParams(location.search).get("data"));


  // if (result[0] != null && result[0].RH_factor == "+") {
  //   result[0].RH_factor = "Positive";
  // } else if (result[0] != null && result[0].RH_factor == "-") {
  //   result[0].RH_factor = "Negative";
  // }

  const goToPendingRequests = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/DoctorHome/PendingRequests");
    } catch (err) {
      console.log(err);
    }
  };


  const handleChange = (e) => {
    setRecipient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(result);
    if (result.length > 0) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  }, [result]);

  

  const handleClickBack = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/DoctorHome");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mainDiv">
      <div className="header">
        <button className="backButton" onClick={handleClickBack}>
          Back
        </button>
        Logo here
      </div>

      {showInfo ? (
      
        <BloodRequestInfo result={result} />
        
      ) : (
        <div>
          <h1>No suitable match found.</h1>
          <h3>Your request will be stored. Check the pending requests regularly; if a matching unit of blood becomes available, you can schedule a transfusion.</h3>
          <button onClick={goToPendingRequests}>Pending Requests</button>
          
          {error && <p>Something went wrong!</p>}
        </div>
      )}
    </div>
  );
};

export default BloodRequestResult;
