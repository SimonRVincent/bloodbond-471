import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";

const RegisterRecipient = () => {

  const navigate = useNavigate();

  const [person, setPerson] = useState({
    firstname: "",
    lastname: "",
    age: null,
    sex: "",
    dob: "",
    phone: null,
    email: "",
    rhfactor: "",
    bloodtype: "",
    healthcondition: "",


  });
  const [error,setError] = useState(false)


  const handleChange = (e) => {
    setPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickBack = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/DoctorHome");

    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // ** HAVE TO EDITN THIS HERE TO POST TO DATABASE **
      await axios.post("http://localhost:8800/books", person);
      navigate("/DoctorHome");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="mainDiv">
        <div className="header">
            <button className="backButton" onClick={handleClickBack}>Back</button>
        Logo here
    </div>
      <div className="form">
      <h1>Enter Recipient Information</h1>
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
        Gender:
        <select name="sex" onChange={handleChange}>
          <option value="">Select Gender</option>
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
        type="number"
        placeholder="Phone number"
        name="phone"
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
        placeholder="Health condition"
        name="healthcondition"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Complete registration</button>
      {error && "Something went wrong!"}
    </div>
    </div>
  );
};

export default RegisterRecipient;