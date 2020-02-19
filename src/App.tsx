import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import NavMenu from "./nav/Nav-menu";
import Home from "./home/Home";
import styled from "styled-components";
import { colors } from "./utils";
import Ai from "./ai/Ai";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <NavMenu></NavMenu>
        </nav>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/ai">
          <Ai></Ai>
        </Route>
      </div>
    </Router>
  );
}
export default App;
