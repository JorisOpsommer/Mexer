import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import NavMenu from "./nav/Nav-menu";
import Home from "./home/Home";
import styled from "styled-components";
import { colors } from "./utils";
import Ai from "./ai/Ai";
import FundingPage from "./funding/Funding-page";
import Oi from "./oi/Oi-page";
import Orderbook from "./orderbook/Orderbook-page";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <NavMenu></NavMenu>
        </nav>
        <Route exact path="/Mexer/">
          <Home></Home>
        </Route>
        <Route path="/Mexer/funding">
          <FundingPage></FundingPage>
        </Route>
        <Route path="/Mexer/oi">
          <Oi></Oi>
        </Route>
        <Route path="/Mexer/orderbook">
          <Orderbook></Orderbook>
        </Route>
        <Route path="/Mexer/ai">
          <Ai></Ai>
        </Route>
      </div>
    </Router>
  );
}
export default App;
