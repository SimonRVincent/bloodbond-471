import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate,} from "react-router-dom";
import {BloodBondTitle} from "../components/BloodBondTitle";
import {BackButton} from "../components/BackButton";
import {Avatar, Box, Divider, Grid, Typography} from "@mui/material";
// import waterDropicon
import {WaterDropOutlined} from "@mui/icons-material";

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
      // <div className="mainDiv">
      //     <div className="header">
      //       <BloodBondTitle />
      //         <BackButton onClick={handleClickBack} />
      //         <h1>Blood Inventory</h1>
      //
      //
      // </div>

      // <div className="blood_supply">
      //     {blood.map((blood) => (
      //       <div key={blood.Inventory_ID} className="blood">
      //         <h3>Inventory ID: {blood.Inventory_ID}</h3>
      //         <p>Blood ID: {blood.Blood_ID}</p>
      //         <p>Hospital ID: {blood.Hospital_ID}</p>
      //         <p>Collection date: {blood.Collection_date}</p>
      //         <span>Expiration date: {blood.Expiration_date}</span>
      //           {/* <Link
      //             to={`/update/${book.id}`}
      //             style={{ color: "inherit", textDecoration: "none" }}
      //           >
      //             Update
      //           </Link> */}
      //
      //       </div>
      //     ))}
      //   </div>
      //
      //
      // </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{
            backgroundImage: 'linear-gradient(135deg, #FEE6E7 0%, #F5F5F5 100%)',

            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            minWidth: "300px",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <BloodBondTitle/>
            <BackButton onClick={handleClickBack}/>
            <Divider sx={{width: "100%", marginY: "1rem"}}/>
            <Typography variant="h3" align="center" sx={{
              fontWeight: "bold",
              color: "#ad1a1a",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1), 2px 2px 4px rgba(0, 0, 0, 0.1), 4px 4px 8px rgba(0, 0, 0, 0.1)",
              "@media (min-width: 600px)": {
                fontSize: "3.5rem",
                fontWeight: 600,
              },
              "@media (min-width: 960px)": {
                fontSize: "4.5rem",
                fontWeight: 700,
              }
            }}>
              Blood Inventory
            </Typography>
            <Typography variant="h5" align="center" sx={{
              color: "#657786",
              fontWeight: 500,
              marginTop: "1rem",
              lineHeight: 1.6,
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
            }}>
              Discover our extensive collection of blood inventory to meet your needs.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            {blood.map((blood) => (
                <Grid item xs={12} md={6} lg={4} key={blood.Inventory_ID}>

                  <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "1rem",
                    borderRadius: "1rem",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                    bgcolor: "#B71C1C",
                  }}>
                    <Avatar sx={{
                      bgcolor: "#FFFFFF",
                      width: {xs: "4rem", md: "5rem"},
                      height: {xs: "4rem", md: "5rem"},
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                      marginBottom: "1rem",
                    }}>
                      <WaterDropOutlined sx={{fontSize: {xs: "2rem", md: "3rem"}, color: "#B71C1C"}}/>
                    </Avatar>
                    <Typography variant="h4" sx={{
                      color: "#FFFFFF",
                      fontFamily: "sans-serif",
                      lineHeight: {xs: "1.2", md: "1.5"},
                      letterSpacing: "0.1rem",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      fontSize: {xs: "1.5rem", md: "2rem"}
                    }}>
                      Inventory ID: {blood.Inventory_ID}
                    </Typography>

                    <Typography sx={{
                      color: "#FFFFFF",
                      fontFamily: "sans-serif",
                      lineHeight: {xs: "1.1", md: "1.5"},
                      letterSpacing: "0.1rem",
                      textTransform: "uppercase",
                      marginBottom: "0.25rem",
                      fontWeight: "bold",
                      fontSize: {xs: "1.0rem", md: "inherit"}
                    }}>
                      Blood ID: {blood.Blood_ID}
                    </Typography>
                    <Typography sx={{
                      color: "#FFFFFF",
                      fontFamily: "sans-serif",
                      lineHeight: {xs: "1.1", md: "1.5"},
                      letterSpacing: "0.1rem",
                      textTransform: "uppercase",
                      marginBottom: "0.25rem",
                      fontWeight: "bold",
                      fontSize: {xs: "1.0rem", md: "inherit"}
                    }}>
                      Hospital ID: {blood.Hospital_ID}
                    </Typography>
                    <Typography sx={{
                      color: "#FFFFFF",
                      fontFamily: "sans-serif",
                      lineHeight: {xs: "1.1", md: "1.5"},
                      letterSpacing: "0.1rem",
                      textTransform: "uppercase",
                      marginBottom: "0.25rem",
                      fontWeight: "bold",
                      fontSize: {xs: "1.0rem", md: "inherit"}
                    }}>
                      Collection date: {blood.Collection_date}
                    </Typography>
                    <Typography sx={{
                      color: "#FFFFFF",
                      fontFamily: "sans-serif",
                      lineHeight: {xs: "1.1", md: "1.5"},
                      letterSpacing: "0.1rem",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      fontSize: {xs: "1.0rem", md: "inherit"}
                    }}>
                      Expiration date: {blood.Expiration_date}
                    </Typography>

                  </Box>

                </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>


  );
};

export default BloodInventory;