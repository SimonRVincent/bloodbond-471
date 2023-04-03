import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BloodRequest = () => {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState({ hcid: null });
  const [insertionResult, setInsertionResult] = useState(null);
  const [insertionResult2, setInsertionResult2] = useState(null);
  const [error, setError] = useState(false);

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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/getRecipient",
        recipient
      );
      setInsertionResult(response.data);
      console.log(response.data);
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
        const person = {hcid: recipient.hcid};
        const response2 = await axios.post("http://localhost:8800/getPerson", person);
        setInsertionResult2(response2.data);
        console.log(response2.data);
    } catch (error) {
        if (error.response.status === 409) {
            setInsertionResult2(null);
            setError(true);
            alert("No such recipient exists. Please ensure that the patient is registered.");
        } else {
            console.error("Error getting data:", error);
        }
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
      {insertionResult ? (
        <div className="recipient-info">
          <h1>Recipient Information</h1>
          {/* <p>Name: {insertionResult2.First_name} {insertionResult2.Last_name}</p> */}
          <p>Blood type: {insertionResult.Blood_type}</p>
          <p>Rh factor: {insertionResult.Rh_factor}</p>
          {/* <p>Sex: {insertionResult2.Sex}</p> */}
          <p>Health condition: {insertionResult.Health_condition}</p>
          
        </div>
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
