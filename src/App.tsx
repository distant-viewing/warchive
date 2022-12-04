import React from "react";
import InteractiveViz from "./components/InteractiveViz.tsx";

import "./reset.css";
import "./App.css";

function App() {
  return (
    <div>
      <div id="header">
        <span id="title">UKRAINE PHOTO WARCHIVE</span>
        <div className="lang-group">
          <span style={{color: "midnightblue", fontSize: "1.2em"}}><b>[en]</b> - uk</span>
        </div>
      </div>

      <InteractiveViz/>

    </div>
  );
}

export default App;
