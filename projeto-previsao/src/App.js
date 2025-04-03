import { useState } from "react";
import "./App.css";
import ComponentePrevisao from "./components/ComponentePrevisao/ComponentePrevisao";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#00A8FF",
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
