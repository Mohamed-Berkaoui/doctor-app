import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import DoctorRegister from "./pages/DoctorRegister";
import LoginDoctor from "./pages/LoginDoctor";
import { useDoctor } from "./context/DoctorContext";
import Dashboard from "./pages/Dashboard";

function App() {
  const { token } = useDoctor();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route
          path="/dashboard/register"
          element={!token ? <DoctorRegister /> : <Navigate to={"/dashboard/doctor"}/>}
        />
        <Route path="/dashboard/login" element={!token ? <LoginDoctor />   : <Navigate to={"/dashboard/doctor"}/>} />
        <Route
          path="/dashboard/doctor"
          element={token ? <Dashboard /> : <Navigate to={"/dashboard/login"} />}
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  );
}

export default App;
