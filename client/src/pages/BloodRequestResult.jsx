import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import BloodRequestInfo from "./BloodRequestInfo";
import {BloodBondTitle} from "../components/BloodBondTitle";
import {BackButton} from "../components/BackButton";

const BloodRequestResult = () => {
    const navigate = useNavigate();
    const [recipient, setRecipient] = useState({hcid: null});
    const [insertionResult, setInsertionResult] = useState(null);
    const [error, setError] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const location = useLocation();
    const result = JSON.parse(new URLSearchParams(location.search).get("data"));


  // if (result[0] != null && result[0].RH_factor == "+") {
  //   result[0].RH_factor = "Positive";
  // } else if (result[0] != null && result[0].RH_factor == "-") {
  //   result[0].RH_factor = "Negative";
  // }

  const goToPendingRequests = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/DoctorHome/PendingRequests");
    } catch (err) {
      console.log(err);
    }
  };


  const handleChange = (e) => {
    setRecipient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(result);
    if (result.length > 0) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  }, [result]);

  

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
            <BackButton onClick={handleClickBack}/>
            <BloodBondTitle/>
        </div>

      {showInfo ? (

        <BloodRequestInfo result={result} />

      ) : (
          <div>
              <h1>No suitable match found.</h1>
              <h3>Your request will be stored. Check the pending requests regularly; if a matching unit of blood becomes
                  available, you can schedule a transfusion.</h3>
              <button onClick={goToPendingRequests}>Pending Requests</button>

              {error && <p>Something went wrong!</p>}
          </div>
      )}
    </div>
      //   <Grid container justifyContent="center" alignItems="center">
      //     <Grid item xs={12} className="header">
      //       <BackButton onClick={handleClickBack} />
      //       <BloodBondTitle />
      //     </Grid>
      //
      //     {showInfo ? (
      //         <Grid item xs={12}>
      //           <BloodRequestInfo result={result} />
      //         </Grid>
      //     ) : (
      //         <Grid item xs={12}>
      //           <Typography variant="h1" component="h1">No suitable match found.</Typography>
      //           <Typography variant="h3" component="h3" paragraph>Your request will be stored. Check the pending requests regularly; if a matching unit of blood becomes available, you can schedule a transfusion.</Typography>
      //           <Button variant="contained" onClick={goToPendingRequests}>Pending Requests</Button>
      //
      //           {error && <Typography variant="body1" component="p" color="error">Something went wrong!</Typography>}
      //         </Grid>
      //     )}
      //   </Grid>
  );
};

export default BloodRequestResult;
