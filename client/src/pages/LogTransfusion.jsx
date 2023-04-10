
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";
 
const LogTransfusion = () => {

     const navigate = useNavigate();

     const [transfusionhistory, setTransfusionHistory] = useState({
      hcid: null,
      dateoftransfusion: "",

      transfusionstatus: "",
      bloodid: "",

  });

    

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

    const handleChange = (e) => {
      setTransfusionHistory((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    // Delete from blood inventory if the transfusion was complete
    const handleComplete= async (id) =>{
      try{
        await axios.delete("http://localhost:8800/deleteinventory/"+id);
        await axios.post("http://localhost:8800/addtransfusionhistory", transfusionhistory);
        await axios.put("http://localhost:8800/updateblood/"+id);
        window.location.reload()
      }
      catch(eer){
        console.log(eer);
      }
    }

    const handleIncomplete= async (e) =>{
      try{
        window.location.reload()
      }
      catch(eer){
        console.log(eer);
      }
    }


    return (

        <div className="mainDiv">

        <div className="header">
            <button className="backButton" onClick={handleClickBack}>Back</button>
        Logo here
        </div>

        <div className = "LogTransfusion">
         <h1> Log Transfusion </h1>

        <input type="text" placeholder="Recipient HCID" name="hcid" onChange={handleChange}/>

        <br></br>
        <br></br>

        <input type="text" placeholder="Blood ID" name = "bloodid"  onChange={handleChange} />
        <input type="text" placeholder="Transfusion Date" name = "dateoftransfusion"  onChange={handleChange} />
        
        <br></br>
        <br></br>
        
        <label>
        Status:
            <button classname="Complete" onClick={() => handleComplete(transfusionhistory.bloodid)}> Complete</button>
            <button classname="Incomplete" onClick={() => handleIncomplete()}> Incomplete</button>
        </label>
         </div>

         </div>
       );













};

export default LogTransfusion;


