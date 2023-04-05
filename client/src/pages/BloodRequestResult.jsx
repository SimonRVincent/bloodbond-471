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
    if (result != null) {
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
        <>
          <div className="bloodRequest">
            <h3>Blood ID: {result[0].Blood_ID}</h3>
          </div>
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
          {error && <p>Something went wrong!</p>}
        </div>
      )}
    </div>
  );
};

export default BloodRequestResult;
