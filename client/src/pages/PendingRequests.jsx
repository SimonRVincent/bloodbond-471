import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";

const PendingRequests = () => {

  const navigate = useNavigate();
  const [request, setRequests] = useState([]);


  /* TO DO:
  DISPLAY BLOOD INVENTORY ON SCREEN
  */


  const [error,setError] = useState(false)


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

  const handleClickBack = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/DoctorHome");

    } catch (err) {
      console.log(err);
    }
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   try {
  //       // ** HAVE TO EDITN THIS HERE TO POST TO DATABASE **
  //     await axios.post("http://localhost:8800/books", appt);
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //     setError(true)
  //   }
  // };

  return (
    <div className="mainDiv">
        <div className="header">
            <button className="backButton" onClick={handleClickBack}>Back</button>
        Logo here
    </div>

    <div className="pending_requests">
        {request.map((request) => (
          <div key={request.Request_ID} className="request">
            <h3>Request ID: {request.Request_ID}</h3>
            <h3>Requestee HCID: {request.HCID}</h3>
            <h3>Blood Type: {request.Blood_type}</h3>
            <p>RH Factor: {request.RH_factor}</p>
            <span>Date Requested: {request.Date}</span>
              {/* <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link> */}
            
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default PendingRequests;