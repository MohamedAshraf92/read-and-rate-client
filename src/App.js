import React from "react";
import { Redirect, Route, Switch } from "react-router";
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
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/adminLogin" component={AdminLogin} />
        <Route exact path="/adminPanel" component={AdminPanel} />

        {/*user ? "" : <Redirect to="/" />*/}
      </Switch>
    </div>
  );
}

export default App;
