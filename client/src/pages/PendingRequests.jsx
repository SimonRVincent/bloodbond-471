import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Grid, Typography} from "@mui/material";
import {BloodBondTitle} from "../components/BloodBondTitle";
import {BackButton} from "../components/BackButton";

const PendingRequests = () => {

  //NOTE: There are warnings due to duplicate keys in the matching requests table.
  // This is because one blood entity in the database can match multiple requests.
  // It causes nom adverse behaviour as far as I cn tell, but it is something to be aware of
  // and fixed of possible.

  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [matchingRequests, setMatchingRequests] = useState([]);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    const fetchMatchingRequests = async () => {
      try {
        const matchingRequests = [];
        for (const request of requests) {
          const res = await axios.post("http://localhost:8800/getMatchingRequests", request);
          const matchingBlood = res.data[0]; // assuming only one matching blood is returned
          if (matchingBlood) {
            matchingRequests.push({ request, matchingBlood }); // combine request and matching blood
          }
        }
        setMatchingRequests(matchingRequests.map((request) => request));

      } catch (err) {
        console.log(err);
      }
    };
    fetchMatchingRequests();
  }, [requests]);
  

  const handleClickBack = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
      navigate("/DoctorHome");
    } catch (err) {
      console.log(err);
    }
  };

  const handleBookTransfusion = async (e, Request_ID, Blood_ID, HCID) => {
    e.preventDefault();
    const dataObject = { Request_ID, Blood_ID, HCID };
    try {
      // Book transfusion
      console.log(`Booking transfusion for request ID ${Request_ID}`);
      navigate(`/DoctorHome/BloodTransfusion?data=${JSON.stringify(dataObject)}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
//     <div className="mainDiv">
//       <div className="header">
//         <button className="backButton" onClick={handleClickBack}>Back</button>
//         Logo here
//       </div>
//
//       <div className="pending_requests">
//         <h2>Pending Requests</h2>
//         {requests.map((request) => (
//           <div key={request.Request_ID} className="request">
//             <h3>Request ID: {request.Request_ID}</h3>
//             <p>Requestor HCID: {request.HCID}</p>
//             <p>Blood Type: {request.Blood_type}</p>
//             <p>RH Factor: {request.RH_factor}</p>
//             <span>Date Requested: {request.Date}</span>
//             {matchingRequests.includes(request.Request_ID) &&
//               <button onClick={(e) => handleBookTransfusion(e, request.Request_ID)}>Book Transfusion</button>
//             }
//           </div>
//         ))}
//       </div>
//
//       <div className="matching_requests">
//         <h2>Matching Requests</h2>
//         {matchingRequests.map(({ request, matchingBlood }) => (
//     <div key={matchingBlood.Request_ID} className="request">
//     <h3>Request ID: {request.Request_ID}</h3>
//     <p>Blood ID: {matchingBlood.Blood_ID}</p>
//     <p>Blood Type: {matchingBlood.Blood_group}</p>
//     <p>RH Factor: {matchingBlood.RH_factor}</p>
//     <button onClick={(e) => handleBookTransfusion(e, request.Request_ID, matchingBlood.Blood_ID, request.HCID)}>Book Transfusion</button>
//   </div>
// ))}
//
//       </div>
//     </div>

      // <Box sx={{bgcolor: "#f2f2f2", py: 4, px: { xs: 2, md: 10 }}}>
      //   <Grid container justifyContent="space-between" alignItems="center">
      //     <Grid item>
      //       <BloodBondTitle />
      //       <BackButton onClick={handleClickBack} />
      //     </Grid>
      //   </Grid>
      //   <Box mt={4}>
      //     <Typography variant="h4" mb={2}>Pending Requests</Typography>
      //     {requests.map((request) => (
      //         <Box key={request.Request_ID} sx={{border: "1px solid #ccc", p: 2, mb: 2, borderRadius: "5px"}}>
      //           <Typography variant="h6" mb={1}>Request ID: {request.Request_ID}</Typography>
      //           <Typography>Requestor HCID: {request.HCID}</Typography>
      //           <Typography>Blood Type: {request.Blood_type}</Typography>
      //           <Typography>RH Factor: {request.RH_factor}</Typography>
      //           <Typography>Date Requested: {request.Date}</Typography>
      //           {matchingRequests.includes(request.Request_ID) &&
      //               <Button sx={{mt: 2}} variant="contained" color="secondary" onClick={(e) => handleBookTransfusion(e, request.Request_ID)}>Book Transfusion</Button>
      //           }
      //         </Box>
      //     ))}
      //   </Box>
      //   <Box mt={4}>
      //     <Typography variant="h4" mb={2}>Matching Requests</Typography>
      //     {matchingRequests.map(({ request, matchingBlood }) => (
      //         <Box key={matchingBlood.Request_ID} sx={{border: "1px solid #ccc", p: 2, mb: 2, borderRadius: "5px"}}>
      //           <Typography variant="h6" mb={1}>Request ID: {request.Request_ID}</Typography>
      //           <Typography>Blood ID: {matchingBlood.Blood_ID}</Typography>
      //           <Typography>Blood Type: {matchingBlood.Blood_group}</Typography>
      //           <Typography>RH Factor: {matchingBlood.RH_factor}</Typography>
      //           <Button sx={{mt: 2}} variant="contained" color="secondary" onClick={(e) => handleBookTransfusion(e, request.Request_ID, matchingBlood.Blood_ID, request.HCID)}>Book Transfusion</Button>
      //         </Box>
      //     ))}
      //   </Box>
      // </Box>

      // <Box sx={{bgcolor: "#E8EAED", py: 4, px: { xs: 2, md: 10 }}}>
      //   <Grid container justifyContent="space-between" alignItems="center" sx={{mb: 4}}>
      //     <Grid item>
      //       <BloodBondTitle sx={{color: "#FF2E63"}} />
      //       <BackButton onClick={handleClickBack} sx={{color: "#FF2E63", mt: 1}} />
      //     </Grid>
      //   </Grid>
      //   <Box>
      //     <Typography variant="h4" mb={2} sx={{color: "#FF2E63"}}>Pending Requests</Typography>
      //     {requests.map((request) => (
      //         <Box key={request.Request_ID} sx={{bgcolor: "#FFF", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", mb: 4}}>
      //           <Typography variant="h6" mb={1} sx={{color: "#FF2E63", fontWeight: "bold", p: 2}}>Request ID: {request.Request_ID}</Typography>
      //           <Typography p={2}>Requestor HCID: {request.HCID}</Typography>
      //           <Typography p={2}>Blood Type: {request.Blood_type}</Typography>
      //           <Typography p={2}>RH Factor: {request.RH_factor}</Typography>
      //           <Typography p={2}>Date Requested: {request.Date}</Typography>
      //           {matchingRequests.includes(request.Request_ID) &&
      //               <Button sx={{mt: 2, mb: 2, ml: 2}} variant="contained" color="secondary" onClick={(e) => handleBookTransfusion(e, request.Request_ID)}>Book Transfusion</Button>
      //           }
      //         </Box>
      //     ))}
      //   </Box>
      //   <Box>
      //     <Typography variant="h4" mb={2} sx={{color: "#FF2E63"}}>Matching Requests</Typography>
      //     {matchingRequests.map(({ request, matchingBlood }) => (
      //         <Box key={matchingBlood.Request_ID} sx={{bgcolor: "#FFF", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", mb: 4}}>
      //           <Typography variant="h6" mb={1} sx={{color: "#FF2E63", fontWeight: "bold", p: 2}}>Request ID: {request.Request_ID}</Typography>
      //           <Typography p={2}>Blood ID: {matchingBlood.Blood_ID}</Typography>
      //           <Typography p={2}>Blood Type: {matchingBlood.Blood_group}</Typography>
      //           <Typography p={2}>RH Factor: {matchingBlood.RH_factor}</Typography>
      //           <Button sx={{mt: 2, mb: 2, ml: 2}} variant="contained" color="secondary" onClick={(e) => handleBookTransfusion(e, request.Request_ID, matchingBlood.Blood_ID, request.HCID)}>Book Transfusion</Button>
      //         </Box>
      //     ))}
      //   </Box>
      // </Box>

      <Box sx={{bgcolor: "#fce9ef", py: 4, px: {xs: 2, md: 10}, minHeight: "100vh"}}>
        <Grid container alignItems="center" sx={{mb: 4}} justifyContent="center">
          <Grid item>
            <BloodBondTitle sx={{color: "#FF2E63"}}/>
            <BackButton onClick={handleClickBack} sx={{color: "#FF2E63", mt: 1}}/>
            <Typography
                variant="h3"
                sx={{
                  mt: 5,
                  mb: 4,
                  color: '#BF1E2E',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textShadow: '2px 2px 5px rgba(255, 46, 99, 0.3)',
                  '@media (max-width:600px)': {
                    fontSize: '24px'
                  },
                }}
            >
              Blood Request
            </Typography>
          </Grid>
        </Grid>
        {requests.length > 0 ? (
            <Box>
              < Typography variant="h4" mb={2} sx={{color: "#FF2E63", fontSize: "24px", fontWeight: "bold"}}>Pending
                Requests</Typography>
              {requests.map((request) => (
                  <Box key={request.Request_ID}
                       sx={{bgcolor: "#FFF", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", mb: 4}}>
                    <Typography variant="h6" mb={1} sx={{color: "#FF2E63", fontWeight: "bold", p: 2}}>Request
                      ID: {request.Request_ID}</Typography>
                    <Typography p={2}>Requestor HCID: {request.HCID}</Typography>
                    <Typography p={2}>Blood Type: {request.Blood_type}</Typography>
                    <Typography p={2}>RH Factor: {request.RH_factor}</Typography>
                    <Typography p={2}>Date Requested: {request.Date}</Typography>
                    {matchingRequests.includes(request.Request_ID) &&
                        <Button sx={{mt: 2, mb: 2, ml: 2}} variant="contained" color="secondary"
                                onClick={(e) => handleBookTransfusion(e, request.Request_ID)}>Book Transfusion</Button>
                    }
                  </Box>
              ))}
            </Box>
        ) : (
            <Box sx={{mb: 4}}>
              <Typography variant="h4" sx={{fontWeight: "bold", color: "#FF2E63", fontSize: "24px", mb: 2}}>
                Pending Requests
              </Typography>
              <Typography sx={{fontFamily: "Helvetica Neue, sans-serif", fontSize: "18px"}}>
                There are currently no pending requests.
              </Typography>

            </Box>
        )}
        {matchingRequests.length > 0 ? (
            <Box>
              <Typography variant="h4" mb={2} sx={{color: "#FF2E63", fontSize: "24px", fontWeight: "bold"}}>
                Matching Requests
              </Typography>
              {matchingRequests.map(({request, matchingBlood}) => (
                  <Box
                      key={matchingBlood.Request_ID}
                      sx={{bgcolor: "#FFF", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", mb: 4}}
                  >
                    <Typography variant="h6" mb={1} sx={{color: "#FF2E63", fontWeight: "bold", p: 2, fontSize: "20px"}}>
                      Request ID: {request.Request_ID}
                    </Typography>
                    <Typography p={2} sx={{fontSize: "18px"}}>
                      Blood ID: {matchingBlood.Blood_ID}
                    </Typography>
                    <Typography p={2} sx={{fontSize: "18px"}}>
                      Blood Type: {matchingBlood.Blood_group}
                    </Typography>
                    <Typography p={2} sx={{fontSize: "18px"}}>
                      RH Factor: {matchingBlood.RH_factor}
                    </Typography>
                    <Button
                        sx={{mt: 2, mb: 2, ml: 2}}
                        variant="contained"
                        style={{backgroundColor: "#FF2E63", color: "#FFF", fontWeight: "bold", fontSize: "16px"}}
                        onClick={(e) => handleBookTransfusion(e, request.Request_ID, matchingBlood.Blood_ID, request.HCID)}
                    >
                      Book Transfusion
                    </Button>
                  </Box>
              ))}
            </Box>
        ) : (
            <Box sx={{mb: 4}}>
              <Typography variant="h4" mb={2} sx={{
                color: "#FF2E63",
                fontFamily: "Helvetica Neue, sans-serif",
                fontWeight: "bold",
                fontSize: "24px"
              }}>
                Matching Requests
              </Typography>
              <Typography sx={{fontFamily: "Helvetica Neue, sans-serif", fontSize: "18px"}}>
                No matching requests at the moment. Please check back later.
              </Typography>

            </Box>
        )}
      </Box>


  );
};

export default PendingRequests;
