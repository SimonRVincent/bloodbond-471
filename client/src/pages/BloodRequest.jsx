import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipientInformation from "./RecipientInformation";

const BloodRequest = () => {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState({ hcid: null });
  const [insertionResult, setInsertionResult] = useState(null);
  const [insertionResult2, setInsertionResult2] = useState(null);
  const [error, setError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleChange = (e) => {
    setRecipient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  const handleBloodRequest = async (e) => {
    e.preventDefault();
    try {
        console.log(insertionResult[0].Blood_type);
        const response = await axios.post("http://localhost:8800/bloodRequest", insertionResult[0]);
        navigate(`/DoctorHome/BloodRequest/BloodRequestResult?data=${JSON.stringify(response.data)}`);
        console.log(response.data);
    } catch (error) {
        if (error.response.status === 409) {
            setError(true);
        } else {
            console.error("Error making blood request:", error);
        }
    }
    };



  useEffect(() => {
    console.log("insertionResult changed:", insertionResult);
    console.log("insertionResult2 changed:", insertionResult2);
  }, [insertionResult, insertionResult2]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/getRecipient",
        recipient
      );
      setInsertionResult(response.data);
      console.log("insertionResult:", insertionResult);
    } catch (error) {
      if (error.response.status === 409) {
        setInsertionResult(null);
        setError(true);
        alert(
          "No such recipient exists. Please ensure that the patient is registered."
        );
      } else {
        console.error("Error getting data:", error);
      }
    }
    try {
      const person = { hcid: recipient.hcid };
      const response2 = await axios.post(
        "http://localhost:8800/getPerson",
        person
      );
      setInsertionResult2(response2.data);
    } catch (error) {
      if (error.response.status === 409) {
        setInsertionResult2(null);
        setError(true);
        alert(
          "No such recipient exists. Please ensure that the patient is registered."
        );
      } else {
        console.error("Error getting data:", error);
      }
    }
    setShowInfo(true);
  };

  useEffect(() => {
    setShowInfo(false);
  }, [recipient]);

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
          <RecipientInformation
            insertionResult={insertionResult}
            insertionResult2={insertionResult2}
          />
          <button onClick={handleBloodRequest}>Make blood request</button>
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
          <button onClick={handleClick}>Look for recipient</button>
          {error && <p>Something went wrong!</p>}
        </div>
      )}
    </div>
  );
};

export default BloodRequest;
