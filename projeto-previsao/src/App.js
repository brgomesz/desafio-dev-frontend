import { useState } from "react";
import "./App.css";
import ComponentePrevisao from "./components/ComponentePrevisao/ComponentePrevisao";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#dfe985",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <ComponentePrevisao/>
    </div>
  );
}

export default App;
