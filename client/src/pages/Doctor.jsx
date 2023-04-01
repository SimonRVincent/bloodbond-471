import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";

const Doctor = () => {

  const navigate = useNavigate();

  const [valueToCheck, setValueToCheck] = useState('');
  const [checkResult, setCheckResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/verifyDoctor', {
        valueToCheck,
      });
      setCheckResult(response.data.exists);
    } catch (error) {
      console.error('Error checking existence:', error);
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
      <div className="form">
      <h1>Enter Doctor ID</h1>
  
      <form onSubmit={handleSubmit}>
        <label>
          Value to check:
          <input
            type="text"
            value={valueToCheck}
            onChange={(e) => setValueToCheck(e.target.value)}
          />
        </label>
        <button type="submit">Verify</button>
      </form>

      
    </div>

    {checkResult !== null && (
        <p>{checkResult ? 'Value exists in database.' : 'Value does not exist in database.'}</p>
    )}
    </div>
  );
};

export default Doctor;