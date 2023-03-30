import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Books from "./pages/Books";
import Update from "./pages/Update";
import Home from "./pages/Home";
import Donor from "./pages/Donor";
import Doctor from "./pages/Doctor";
import DonorAppt from "./pages/DonorAppt";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Doctor" element={<Doctor />} />
          <Route path="/Donor" element={<Donor />} />
          <Route path="/Donor/DonorAppt" element={<DonorAppt />} />
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
