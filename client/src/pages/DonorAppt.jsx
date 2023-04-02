import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";

const DonorAppt = () => {

  const navigate = useNavigate();

  const [person, setPerson] = useState({
    firstname: "",
    lastname: "",
    age: null,
    sex: "",
    dob: "",
    email: "",
    hcid: null,

  });
  const [error,setError] = useState(false)

  // WILL HAVE TO FIGURE OUT HOW WE DEAL WITH BLOOD_ID
  const [donor, setDonor] = useState({
    bloodtype: "",
    rhfactor: "",
    donorstat: null,
    bloodid: "",
    hcid: null,
  });



  const handleChange = (e) => {
    setPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setDonor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [insertionResult, setInsertionResult] = useState(null);

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

      const response = await axios.post('http://localhost:8800/addPerson', person);

      setInsertionResult(response.data.message);
      try {
        await axios.post("http://localhost:8800/addDonor", donor);
        navigate("/Donor/DonorAppt/DonorDate", { state: { hcid: person.hcid } });

      } catch (err) {
        console.log(err);
        setError(true)
      }
    } catch (error) {
      if (error.response.status === 409) {
        setInsertionResult(error.response.data.message);
        alert("Donor is already registered. Proceeding to booking.");
        navigate("/Donor/DonorAppt/DonorDate");
      } else {
        console.error('Error inserting data:', error);
      }
    }
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:8800/checkHcidExists', {
  //       person,
  //     });
  //     if (response.data.exists) {
  //       alert("Patient is already registered. Proceeding to booking.");
  //       navigate("/Donor/DonorAppt/DonorDate");
  //     } else {
  //       try {
  //         await axios.post("http://localhost:8800/addPerson", person);
  //         // If successful, do next post request
    
  //         await axios.post("https://localhost:8800/addDonor", donor);
  //         navigate("/Donor/DonorAppt/DonorDate");
  //       } catch (err) {
  //         console.log(err);
  //         setError(true)
  //       }
  //     };
  //     } catch (error) {
  //     console.error('Error checking existence:', error);
  //   }
  // };


  return (
    <div className="mainDiv">
        <div className="header">
            <button className="backButton" onClick={handleClickBack}>Back</button>
        Logo here
    </div>
      <div className="form">
      <h1>Enter Donor Information</h1>
      <input
        type="text"
        placeholder="First name"
        name="firstname"
        onChange={handleChange}
      />
      <input
        rows={5}
        type="text"
        placeholder="Last name"
        name="lastname"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Age"
        name="age"
        onChange={handleChange}
      />
        <label>
        Sex:
        <select name="sex" onChange={handleChange}>
          <option value="">Select Sex</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <input
        type="date"
        placeholder="DOB"
        name="dob"
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Rh factor"
        name="rhfactor"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Blood type"
        name="bloodtype"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Health care ID"
        name="hcid"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Continue to booking</button>
      {error && "Something went wrong!"}
    </div>
    {insertionResult && <p>{insertionResult}</p>}
    </div>
  );
};

export default DonorAppt;