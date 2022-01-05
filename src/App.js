import React from "react";
import { Redirect, Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import LandingPage from "./containers/landingPage/landingPage";
import AdminLogin from "./components/adminLogin/adminLogin";
import AdminPanel from "./containers/adminPanel/adminPanel";

import "./App.css";
import "antd/dist/antd.css";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="adminLogin" element={<AdminLogin />} />
        <Route exact path="adminPanel" element={<AdminPanel />} />

        {/*user ? "" : <Redirect to="/" />*/}
      </Routes>
    </div>
  );
}

export default App;
