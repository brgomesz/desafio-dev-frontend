import React, { useEffect, useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import GrainIcon from "@mui/icons-material/Grain";
import "./CidadesSugeridas.css";

function CidadesSugeridas({ onCidadeSelecionada }) {
  const [dadosClima, setDadosClima] = useState([]);

  const cidadesFixas = ["Joinville", "Florianópolis", "Curitiba"];

  useEffect(() => {
    const apiKey = "b0a67d1ae4e55e99a910ea4120918e5b";
    const buscarDados = async () => {
      try {
        const dados = await Promise.all(
          cidadesFixas.map(async (cidade) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            return {
              nome: cidade,
              temperatura: `${Math.round(data.main.temp)}°C`,

              tempMax: `${Math.round(data.main.temp_max)}°C`,
              tempMin: `${Math.round(data.main.temp_min)}°C`,
              clima: data.weather[0].main.toLowerCase(),
            };
          })
        );
        setDadosClima(dados);
      } catch (error) {
        console.error("Erro ao buscar dados climáticos:", error.message);
      }
    };

    buscarDados();
  }, []);

  const obterIconeClima = (clima) => {
    if (clima.includes("clear"))
      return <WbSunnyIcon style={{ color: "orange" }} />;
    if (clima.includes("cloud")) return <CloudIcon style={{ color: "gray" }} />;
    if (clima.includes("rain")) return <GrainIcon style={{ color: "blue" }} />;
    return <CloudIcon style={{ color: "gray" }} />;
  };

  return (
    <div className="cidades-sugeridas">
      {dadosClima.map((cidade) => (
        <div
          key={cidade.nome}
          className="cidade-card"
          onClick={() => onCidadeSelecionada(cidade.nome)}
        >
          <h3 style={{ textAlign: "start" }}>{cidade.nome}</h3>
          <div className="sugeridas">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {obterIconeClima(cidade.clima)}
              <p className="temperatura-principal-sugeridas">{cidade.temperatura}</p>

              <div className="resultado-sugeridas">
                <div className="resultado resultado-sugeridas-max">
                  <p>{cidade.tempMax}</p>
                </div>
                <div className="resultado resultado-sugeridas-min">
                  <p>{cidade.tempMin}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CidadesSugeridas;
