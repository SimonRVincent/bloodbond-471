// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Add from "./pages/Add";
// import Books from "./pages/Books";
// import Update from "./pages/Update";
// import Home from "./pages/Home";
// import Donor from "./pages/Donor";
// import Doctor from "./pages/Doctor";
// import DonorAppt from "./pages/DonorAppt";
// import DonorDate from "./pages/DonorDate";
// import DoctorHome from "./pages/DoctorHome";
// import BloodTransfusion from "./pages/BloodTransfusion";
// import RegisterRecipient from "./pages/RegisterRecipient";
// import BloodInventory from "./pages/BloodInventory";
//
// function App() {
//   return (
//     <div className="app">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/Doctor" element={<Doctor />} />
//           <Route path="/DoctorHome" element={<DoctorHome />} />
//           <Route path="/DoctorHome/BloodTransfusion" element={<BloodTransfusion />} />
//           <Route path="/DoctorHome/BloodInventory" element={<BloodInventory />} />
//           <Route path="/DoctorHome/RegisterRecipient" element={<RegisterRecipient />} />
//           <Route path="/Donor" element={<Donor />} />
//           <Route path="/Donor/DonorAppt" element={<DonorAppt />} />
//           <Route path="/Donor/DonorAppt/DonorDate" element={<DonorDate />} />
//           <Route path="/" element={<Books />} />
//           <Route path="/add" element={<Add />} />
//           <Route path="/update/:id" element={<Update />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }
//
// export default App;


// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Doctor from './pages/Doctor';
import DoctorHome from './pages/DoctorHome';
import BloodTransfusion from './pages/BloodTransfusion';
import BloodInventory from './pages/BloodInventory';
import RegisterRecipient from './pages/RegisterRecipient';
import Donor from './pages/Donor';
import DonorAppt from './pages/DonorAppt';
import DonorDate from './pages/DonorDate';
import Books from './pages/Books';
import Add from './pages/Add';
import Update from './pages/Update';
import BloodRequest from './pages/BloodRequest';
import BloodRequestResult from './pages/BloodRequestResult';
import PendingRequests from './pages/PendingRequests';

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Doctor" element={<Doctor />} />
                <Route path="/DoctorHome" element={<DoctorHome />} />
                <Route path="/DoctorHome/BloodRequest" element={<BloodRequest />} />
                <Route path="/DoctorHome/BloodRequest/BloodRequestResult" element={<BloodRequestResult />} />
                <Route path="/DoctorHome/BloodTransfusion" element={<BloodTransfusion />} />
                <Route path="/DoctorHome/BloodInventory" element={<BloodInventory />} />
                <Route path="/DoctorHome/RegisterRecipient" element={<RegisterRecipient />} />
                <Route path="/DoctorHome/PendingRequests" element={<PendingRequests />} />
                <Route path="/Donor" element={<Donor />} />
                <Route path="/Donor/DonorAppt" element={<DonorAppt />} />
                <Route path="/Donor/DonorAppt/DonorDate" element={<DonorDate />} />
                <Route path="/" element={<Books />} />
                <Route path="/add" element={<Add />} />
                <Route path="/update/:id" element={<Update />} />
            </Routes>
        </div>
    );
}

export default App;