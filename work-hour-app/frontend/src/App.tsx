import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bulma/css/bulma.css";
import { Home } from "./components/Home";
import { Data } from "./components/Data";
import { Visualization } from "./components/Visualization";
import { Setting } from "./components/Setting";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar is-info">
          <div className="navbar-menu">
            <div className="navbar-start">
              <NavLink to="/" className="navbar-item is-size-5">
                開始
              </NavLink>
              <NavLink to="/data" className="navbar-item is-size-5">
                データ一覧
              </NavLink>
              <NavLink to="/vis" className="navbar-item is-size-5">
                可視化
              </NavLink>
              <NavLink to="/setting" className="navbar-item is-size-5">
                設定
              </NavLink>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path={`/`} element={<Home></Home>} />
          <Route path={`/data`} element={<Data></Data>} />
          <Route path={`/vis`} element={<Visualization></Visualization>} />
          <Route path={`/setting`} element={<Setting></Setting>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
