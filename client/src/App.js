import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Registration from "./pages/Registration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" exact render={(props) => <Registration />} />
        <Route path="/" exact render={(props) => <Main />} />
      </Routes>
    </Router>
  );
}

export default App;