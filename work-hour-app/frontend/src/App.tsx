import React from "react";
import "./App.css";
import { readWork } from "./fetcher";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import "bulma/css/bulma.css";

function App() {
  //readWork().then((responses) =>
  //  console.log(responses.map((response) => console.log(response)))
  //);

  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar is-success is-fixed-top">
          <div className="navbar-menu">
            <div className="navbar-start">
              <NavLink to="/" className="navbar-item is-size-4">
                開始
              </NavLink>
              <NavLink to="/data" className="navbar-item is-size-4 ">
                データ一覧
              </NavLink>
              <NavLink to="/vis" className="navbar-item is-size-4">
                可視化
              </NavLink>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path={`/`} element={<div>home</div>} />
          <Route path={`/data`} element={<div>data</div>} />
          <Route path={`/vis`} element={<div>vis</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
