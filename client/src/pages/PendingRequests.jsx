import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PendingRequests = () => {

  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [matchingRequests, setMatchingRequests] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const res = await axios.get("http://localhost:8800/getPendingRequests");
        setRequests(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRequests();
  }, []);

  useEffect(() => {
    const fetchMatchingRequests = async () => {
      try {
        const matchingRequests = [];
        for (const request of requests) {
          const res = await axios.post("http://localhost:8800/getMatchingRequests", request);
          const matchingBlood = res.data[0]; // assuming only one matching blood is returned
          if (matchingBlood) {
            matchingRequests.push({ request, matchingBlood }); // combine request and matching blood
          }
        }
        setMatchingRequests(matchingRequests);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMatchingRequests();
  }, [requests]);
  

  const handleClickBack = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/DoctorHome");
    } catch (err) {
      console.log(err);
    }
  };

  const handleBookTransfusion = async (e, requestId) => {
    e.preventDefault();
    try {
      // Book transfusion
      console.log(`Booking transfusion for request ID ${requestId}`);
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

      <div className="pending_requests">
        <h2>Pending Requests</h2>
        {requests.map((request) => (
          <div key={request.Request_ID} className="request">
            <h3>Request ID: {request.Request_ID}</h3>
            <p>Requestor HCID: {request.HCID}</p>
            <p>Blood Type: {request.Blood_type}</p>
            <p>RH Factor: {request.RH_factor}</p>
            <span>Date Requested: {request.Date}</span>
            {matchingRequests.includes(request.Request_ID) &&
              <button onClick={(e) => handleBookTransfusion(e, request.Request_ID)}>Book Transfusion</button>
            }
          </div>
        ))}
      </div>

      <div className="matching_requests">
        <h2>Matching Requests</h2>
        {matchingRequests.map(({ request, matchingBlood }) => (
    <div key={request.Request_ID} className="request">
    <h3>Request ID: {request.Request_ID}</h3>
    <p>Blood ID: {matchingBlood.Blood_ID}</p>
    <p>Blood Type: {matchingBlood.Blood_group}</p>
    <p>RH Factor: {matchingBlood.RH_factor}</p>
    <button onClick={(e) => handleBookTransfusion(e, request.Request_ID)}>Book Transfusion</button>
  </div>
))}

      </div>
    </div>
  );
};

export default PendingRequests;
