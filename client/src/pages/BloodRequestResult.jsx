import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BloodRequestResult = () => {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState({ hcid: null });
  const [insertionResult, setInsertionResult] = useState(null);
  const [error, setError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const location = useLocation();
  const result = JSON.parse(new URLSearchParams(location.search).get("data"));

  const handleChange = (e) => {
    setRecipient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  useEffect(() => {
    // Execute your code here
    console.log("result:", result);
    if (result != null) {
        showInfo = true;
    } else {
        showInfo = false;
    }



    console.log("Page loaded");
  }, []);


  const handleClickBack = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //   const handleBloodRequest = async (e) => {
  //     e.preventDefault();
  //     try {
  //         console.log(insertionResult[0].Blood_type);
  //         const response = await axios.post("http://localhost:8800/bloodRequest", insertionResult[0]);
  //         setInsertionResult3(response.data);
  //         console.log(response.data);
  //     } catch (error) {
  //         if (error.response.status === 409) {
  //             setInsertionResult3(null);
  //             setError(true);
  //         } else {
  //             console.error("Error making blood request:", error);
  //         }
  //     }
  //     };

  return (
    <div className="mainDiv">
      <div className="header">
        <button className="backButton" onClick={handleClickBack}>
          Back
        </button>
        Logo here
      </div>

      {showInfo ? (
        <>
            <div className="bloodRequest">
            <h3>Blood ID: {result.Blood_ID}</h3>
            {/* <h3>Blood ID: {blood.Blood_ID}</h3>
            <h3>Hospital ID: {blood.Hospital_ID}</h3> */}
            
            </div>
            
          {/* <button onClick={goToBooking}>Book transfusion</button> */}
        </>
      ) : (
        <div className="form">
          <h1>Enter Recipient HCID</h1>
          <input
            type="text"
            placeholder="Health care ID"
            name="hcid"
            onChange={handleChange}
          />
          {/* <button onClick={handleClick}>Look for recipient</button> */}
          {error && <p>Something went wrong!</p>}
        </div>
      )}

    </div>
  );
};

export default BloodRequestResult;
