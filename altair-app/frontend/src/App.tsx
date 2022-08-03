import { useState, useEffect } from "react";
import axios from "axios";
import { Config, TopLevelSpec, compile } from "vega-lite";
import embed from "vega-embed";

function App() {
  useEffect(() => {
    axios.get(`http://localhost:8000/bar`).then((res) => {
      const data = JSON.parse(res.data) as TopLevelSpec;
      const vegaSpec = compile(data).spec;
      embed("#vis", vegaSpec);
    });
  }, []);
  return (
    <div className="App">
      <div id="vis"></div>
    </div>
  );
}

export default App;
