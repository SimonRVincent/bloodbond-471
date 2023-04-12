import React from "react";
import {useNavigate} from "react-router-dom";
import {Box, Grid, Typography} from "@mui/material";
import {HistoryEdu, Inventory2Outlined, LocalHospitalOutlined, PersonAdd} from "@mui/icons-material";
import {BackButton} from "../components/BackButton";
import {BloodBondTitle} from "../components/BloodBondTitle";
import {Background} from "../components/Background";
import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
import {MenuCard} from "../components/MenuCard";


const DoctorHome = () => {


  const navigate = useNavigate();

  const handleClickBack = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/");

    } catch (err) {
      console.log(err);
    }
  };

  const handleClickRegReci = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/DoctorHome/RegisterRecipient");

    } catch (err) {
      console.log(err);
    }
  };

  const handleClickLogDonation = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/DoctorHome/LogDonation");

    } catch (err) {
      console.log(err);
    }
  };

  const handleClickBloodReq = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/DoctorHome/BloodRequest");

    } catch (err) {
      console.log(err);
    }
  };

  const handleClickBookTransf = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/DoctorHome/BloodTransfusion");

    } catch (err) {
      console.log(err);
    }
  };

  const handleClickBloodInv = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/DoctorHome/BloodInventory");

    } catch (err) {
      console.log(err);
    }
  };

  const handlePendingRequests = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/DoctorHome/PendingRequests");

    } catch (err) {
      console.log(err);
    }
  };

  return (
      <Background>
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{minHeight: "100vh"}}>
          <Grid item sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <BackButton onClick={handleClickBack}/>
          </Grid>
          <Grid item sx={{width: "100%"}}>
            <Box sx={{textAlign: "center", my: "2rem"}}>
              <BloodBondTitle/>
              <Typography variant="h4" component="h2" sx={{fontWeight: "bold", color: "#B71C1C", mb: "1rem"}}>
                Welcome back, Doctor.
              </Typography>
              <Typography variant="h6" component="h3" sx={{fontWeight: "bold", color: "#2B2B2B"}}>
                What would you like to do today?
              </Typography>
            </Box>
          </Grid>
          <Grid item container spacing={{xs: 2, md: 6}} justifyContent="center"
                sx={{mt: "2rem", px: {xs: "1rem", sm: "2rem", md: "4rem"}}}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <MenuCard
                  title="Register Recipient"
                  subtitle="Register a new recipient to receive blood donations and save their information for future reference."
                  icon={PersonAdd}
                  onClick={handleClickRegReci}
                  buttonLabel="Register Recipient"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <MenuCard
                  title="Log Donation"
                  subtitle="Log a new blood donation from a donor and keep track of the available blood types in your inventory."
                  icon={HistoryEdu}
                  onClick={handleClickLogDonation}
                  buttonLabel="Log Donation"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <MenuCard
                  title="Blood Request"
                  subtitle="Request blood for a recipient in need and track the status of the request until it is fulfilled."
                  icon={BloodtypeOutlinedIcon}
                  onClick={handleClickBloodReq}
                  buttonLabel="Blood Request"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <MenuCard
                  title="Book Transfusion"
                  subtitle="Book a blood transfusion for a recipient and schedule a time and date for the procedure."
                  icon={LocalHospitalOutlined}
                  onClick={handleClickBookTransf}
                  buttonLabel="Book Transfusion"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <MenuCard
                  title="Blood Inventory"
                  subtitle="View the available blood types in your inventory and their quantities to ensure that you have enough blood to meet your patients' needs."
                  icon={Inventory2Outlined}
                  onClick={handleClickBloodInv}
                  buttonLabel="Blood Inventory"
              />
            </Grid>
          </Grid>
        </Grid>
      </Background>
  );
};

export default DoctorHome;