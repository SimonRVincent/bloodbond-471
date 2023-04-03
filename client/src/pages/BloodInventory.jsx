import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";

const BloodInventory = () => {

  const navigate = useNavigate();
  const [blood, setBlood] = useState([]);


  /* TO DO:
  DISPLAY BLOOD INVENTORY ON SCREEN
  */


  const [error,setError] = useState(false)


  useEffect(() => {
    const fetchAllBlood = async () => {
      try {
        const res = await axios.get("http://localhost:8800/getBloodInventory");
        setBlood(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBlood();
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

    <div className="blood_supply">
        {blood.map((blood) => (
          <div key={blood.Inventory_ID} className="blood">
            <h3>Inventory ID: {blood.Inventory_ID}</h3>
            <h3>Blood ID: {blood.Blood_ID}</h3>
            <h3>Hospital ID: {blood.Hospital_ID}</h3>
            <p>Collection date: {blood.Collection_date}</p>
            <span>Expiration date: {blood.Expiration_date}</span>
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

export default BloodInventory;