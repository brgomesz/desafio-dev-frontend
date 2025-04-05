import { useState } from "react";
import "./App.css";
import ComponentePrevisao from "./components/ComponentePrevisao/ComponentePrevisao";

function App() {
  const [backgroundClass, setBackgroundClass] = useState("ensolarado");
  return (
    <div className={`fundo-componente ${backgroundClass}`}>
      <ComponentePrevisao setBackgroundClass={setBackgroundClass} />
    </div>
  );
}

export default App;
