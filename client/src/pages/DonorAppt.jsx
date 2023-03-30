import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";

const DonorAppt = () => {

  const navigate = useNavigate();

  const [person, setPerson] = useState({
    firstname: "",
    lastname: "",
    age: null,
    sex: "",

  });
  const [error,setError] = useState(false)


  const handleChange = (e) => {
    setPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      await axios.post("http://localhost:8800/books", person);
      navigate("/");
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
        Gender:
        <select name="sex" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
    </div>
  );
};

export default DonorAppt;