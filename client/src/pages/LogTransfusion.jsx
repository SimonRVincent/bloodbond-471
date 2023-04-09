
import React from "react";
import { useNavigate, } from "react-router-dom";
 
const LogTransfusion = () => {

     const navigate = useNavigate();

    // Handle the buttons 
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
            <button className="backButton" onClick={handleClickBack}>Back</button>
        Logo here
        </div>

        <div className = "LogTransfusion"> 
         LogTransfusion
         </div>

         </div>
       );













};

export default LogTransfusion;


