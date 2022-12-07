import React from "react";
import InteractiveViz from "./components/InteractiveViz.tsx";

import "./reset.css";
import "./App.css";

function App() {
  return (
    <div>
      <div id="header">
        <span id="title">UKRAINIAN WARCHIVE</span>
        <div className="lang-group">
          <span><b>[en]</b> &#8729; uk</span>
        </div>
      </div>

      <InteractiveViz/>

    </div>
  );
}

export default App;
