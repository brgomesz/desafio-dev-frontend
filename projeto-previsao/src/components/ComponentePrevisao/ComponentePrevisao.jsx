import { useState } from "react";
import "./ComponentePrevisao.css";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";

function ComponentePrevisao() {
  const [cidade, setCidade] = useState("");
  const [dadosClima, setDadosClima] = useState(null);
  const [sugestoes, setSugestoes] = useState([]);
  const [indiceSelecionado, setIndiceSelecionado] = useState(0);
  const [dropdownVisivel, setDropdownVisivel] = useState(false);

  const buscarSugestoes = async (input) => {
    if (!input) {
      setSugestoes([]);
      setDropdownVisivel(false);
      return;
    }
    const url = `http://api.geonames.org/searchJSON?q=${input}&maxRows=10&username=brunogomes`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const cidadesUnicas = data.geonames.filter(
        (cidade, index, self) =>
          index ===
          self.findIndex(
            (c) => c.name.toLowerCase() === cidade.name.toLowerCase()
          )
      );
      setSugestoes(cidadesUnicas);
      setIndiceSelecionado(0);
      setDropdownVisivel(true);
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (dropdownVisivel && sugestoes.length > 0) {
      if (e.key === "ArrowDown") {
        setIndiceSelecionado((prev) =>
          Math.min(prev + 1, sugestoes.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        setIndiceSelecionado((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        if (sugestoes[indiceSelecionado]) {
          setCidade(sugestoes[indiceSelecionado].name);
          setSugestoes([]);
          setDropdownVisivel(false);
        }
      }
    }
  };

  const buscarClima = async () => {
    if (!cidade) return;
    const apiKey = "b0a67d1ae4e55e99a910ea4120918e5b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Cidade não encontrada");
      }
      const data = await response.json();
      setDadosClima(data);
      setDropdownVisivel(false);
    } catch (error) {
      console.error(error.message);
      alert("Erro ao buscar dados: " + error.message);
    }
  };

  const selecionarCidade = (nome) => {
    setCidade(nome);
    setSugestoes([]);
    setDropdownVisivel(false);
  };

  return (
    <div className="card-previsao">
      <h1>Digite o nome da cidade</h1>
      <div className="input-cidade">
        <input
          type="text"
          placeholder="Digite a cidade"
          value={cidade}
          onChange={(e) => {
            setCidade(e.target.value);
            buscarSugestoes(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => setDropdownVisivel(false)}
          onFocus={() => setDropdownVisivel(true)}
        />
        <button onClick={buscarClima}>🔎</button>
        {dropdownVisivel && sugestoes.length > 0 && (
          <ul className="dropdown">
            {sugestoes.map((sugestao, index) => (
              <li
                key={sugestao.geonameId}
                className={
                  indiceSelecionado === index ? "sugestao-selecionada" : ""
                }
                onMouseDown={() => selecionarCidade(sugestao.name)}
              >
                {sugestao.name}, {sugestao.countryName}
              </li>
            ))}
          </ul>
        )}
      </div>
      {dadosClima && (
        <div className="resultados">
          <div className="resultado resultado-cidade">
            {" "}
            <LocationPinIcon className="LocationPinIcon" /> {dadosClima.name}
          </div>
          <div className="temperaturas">
            <div className="resultado resultado-temperatura-atual">
              <p>{Math.round(dadosClima.main.temp)}°C</p>
            </div>
            <div className="resultado-temperaturas">
              <div className="resultado resultado-temperaturas-max">
                <p>
                  {/* <ArrowUpwardIcon style={{ color: "red" }} />{" "} */}
                  {Math.round(dadosClima.main.temp_max)}°C
                </p>
              </div>
              <div className="resultado resultado-temperaturas-min">
                <p>
                  {/* <ArrowDownwardIcon style={{ color: "blue" }} /> */}
                  {Math.round(dadosClima.main.temp_min)}°C
                </p>
              </div>
            </div>
          </div>
          <div className="informacoes-complementares">
            <div className="horarios">
              <div>
                <WbTwilightIcon style={{ color: "yellow" }} />
                {new Date(dadosClima.sys.sunrise * 1000).toLocaleTimeString(
                  [],
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </div>
              <div>
                <ModeNightIcon style={{ color: "white" }} />
                {new Date(dadosClima.sys.sunset * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div className="vento-umidade">
              <div>
                <AirRoundedIcon />
                {dadosClima.wind.speed} m/s
              </div>
              <div>
                <WaterDropRoundedIcon /> {dadosClima.main.humidity}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponentePrevisao;
