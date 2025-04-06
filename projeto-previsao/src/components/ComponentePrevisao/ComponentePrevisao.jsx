import { useState } from "react";
import "./ComponentePrevisao.css";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import GrainIcon from "@mui/icons-material/Grain";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CidadesSugeridas from "../CidadesSugeridas/CidadesSugeridas";

function ComponentePrevisao({ setBackgroundClass }) {
  const [cidade, setCidade] = useState("");
  const [dadosClima, setDadosClima] = useState(null);
  const [sugestoes, setSugestoes] = useState([]);
  const [indiceSelecionado, setIndiceSelecionado] = useState(0);
  const [dropdownVisivel, setDropdownVisivel] = useState(false);
  const [cardBackground, setCardBackground] = useState({
    background: "linear-gradient(to top, #0080ff, #c3e3ff)",
  });
  const [informacoesBackground, setInformacoesBackground] = useState({
    backgroundColor: "rgb(130, 167, 247)",
  });
  const [mostrarSugestoes, setMostrarSugestoes] = useState(true);

  const buscarSugestoes = async (input) => {
    if (!input) {
      setSugestoes([]);
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
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error.message);
    }
  };

  const buscarClima = async (cidadeSelecionada = cidade) => {
    if (!cidadeSelecionada) return;
    setMostrarSugestoes(false);

    const apiKey = "b0a67d1ae4e55e99a910ea4120918e5b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidadeSelecionada}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Cidade não encontrada");
      }
      const data = await response.json();
      setDadosClima(data);

      const descricao = data.weather[0].main.toLowerCase();
      if (descricao.includes("clear")) {
        setBackgroundClass("ensolarado");
        setCardBackground({
          background: "linear-gradient(to top, #0080ff, #c3e3ff)",
        });
        setInformacoesBackground({ backgroundColor: "rgb(130, 167, 247)" });
      } else if (descricao.includes("cloud")) {
        setBackgroundClass("nublado");
        setCardBackground({
          background: "linear-gradient(to top,rgb(121, 121, 121), #e0e0e0)",
        });
        setInformacoesBackground({ backgroundColor: "rgb(173, 173, 173)" });
      } else if (descricao.includes("rain")) {
        setBackgroundClass("chuvoso");
        setCardBackground({
          background: "linear-gradient(to top, #4a8ba0, #aecbd8)",
        });
        setInformacoesBackground({ backgroundColor: "rgb(100, 100, 100)" });
      } else if (descricao.includes("snow")) {
        setBackgroundClass("nevando");
        setCardBackground({
          background: "linear-gradient(to top, #d7eef5, #ffffff)",
        });
        setInformacoesBackground({ backgroundColor: "rgb(180, 180, 180)" });
      } else {
        setBackgroundClass("padrao");
        setCardBackground({
          background: "linear-gradient(to top, #f0f0f0, #ffffff)",
        });
        setInformacoesBackground({ backgroundColor: "rgb(130, 167, 247)" });
      }
    } catch (error) {
      console.error("Erro na busca dos dados climáticos:", error.message);
      alert("Erro ao buscar dados: " + error.message);
    }
  };

  const obterIconeClima = () => {
    if (!dadosClima || !dadosClima.weather || !dadosClima.weather[0])
      return null;
    const descricao = dadosClima.weather[0].main.toLowerCase();
    if (descricao.includes("clear"))
      return <WbSunnyIcon style={{ color: "orange", fontSize: 50 }} />;
    if (descricao.includes("cloud"))
      return <CloudIcon style={{ color: "gray", fontSize: 50 }} />;
    if (descricao.includes("rain"))
      return <GrainIcon style={{ color: "blue", fontSize: 50 }} />;
    if (descricao.includes("snow"))
      return <AcUnitIcon style={{ color: "lightblue", fontSize: 50 }} />;
    return <CloudIcon style={{ color: "gray", fontSize: 50 }} />;
  };

  const selecionarCidade = (nome) => {
    setCidade(nome);
    setSugestoes([]);
    setDropdownVisivel(false);
    setMostrarSugestoes(false);
    buscarClima(nome);
  };

  return (
    <div className="card-previsao" style={cardBackground}>
      <h1>Confira o clima na região</h1>
      <div className="input-cidade">
        <Autocomplete
          className="autocomplete"
          options={sugestoes.map((s) => s.name)}
          value={cidade}
          onChange={(event, newValue) => {
            setCidade(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setCidade(newInputValue || "");
            if (newInputValue?.trim() !== "")
              buscarSugestoes(newInputValue.trim());
          }}
          renderInput={(params) => (
            <TextField
              className="input-autocomplete"
              placeholder="Digite o nome da cidade"
              {...params}
              onKeyDown={(e) => {
                if (e.key === "Enter" && cidade.trim() !== "") {
                  e.preventDefault();
                  setSugestoes([]);
                }
              }}
            />
          )}
        />

        <Button
          className="botao-buscar"
          variant="contained"
          onClick={() => {
            if (cidade.trim() !== "") {
              buscarClima();
              setSugestoes([]);
            }
          }}
          data-testid="botao-buscar"
        >
          <SearchRoundedIcon />
        </Button>

        {dropdownVisivel && sugestoes.length > 0 && (
          <ul className="dropdown">
            {sugestoes.map((sugestao, index) => (
              <li
                key={sugestao.geonameId}
                className={
                  indiceSelecionado === index ? "sugestao-selecionada" : ""
                }
                onClick={() => selecionarCidade(sugestao.name)}
              >
                {sugestao.name}, {sugestao.countryName}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card-cidades-sugeridas">
        {mostrarSugestoes && (
          <CidadesSugeridas onCidadeSelecionada={selecionarCidade} />
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
              {obterIconeClima()}
              <p>{Math.round(dadosClima.main.temp)}°C</p>
            </div>
            <div className="resultado-temperaturas">
              <div className="resultado resultado-temperaturas-max">
                <p>{Math.round(dadosClima.main.temp_max)}°C</p>
              </div>
              <div className="resultado resultado-temperaturas-min">
                <p>{Math.round(dadosClima.main.temp_min)}°C</p>
              </div>
            </div>
          </div>
          <div
            className="informacoes-complementares"
            style={informacoesBackground}
          >
            <div className="horarios">
              <div>
                <WbTwilightIcon
                  style={{ color: "yellow", marginRight: "5px" }}
                />
                {new Date(dadosClima.sys.sunrise * 1000).toLocaleTimeString(
                  [],
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </div>
              <div>
                <ModeNightIcon style={{ color: "white", marginRight: "5px" }} />
                {new Date(dadosClima.sys.sunset * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div className="vento-umidade">
              <div>
                <AirRoundedIcon
                  style={{ color: "white", marginRight: "5px" }}
                />
                {dadosClima.wind.speed} m/s
              </div>
              <div>
                <WaterDropRoundedIcon style={{ color: "white" }} />{" "}
                {dadosClima.main.humidity}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponentePrevisao;
