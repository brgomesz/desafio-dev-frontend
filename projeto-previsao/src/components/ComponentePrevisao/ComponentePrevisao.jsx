import { useState } from "react";
import "./ComponentePrevisao.css";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
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
import Button from '@mui/material/Button';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function ComponentePrevisao({setBackgroundClass} ) {
  const [cidade, setCidade] = useState("");
  const [dadosClima, setDadosClima] = useState(null);
  const [sugestoes, setSugestoes] = useState([]);
  const [indiceSelecionado, setIndiceSelecionado] = useState(0);
  const [dropdownVisivel, setDropdownVisivel] = useState(false);
  

  // const buscarSugestoes = async (input) => {
  //   if (!input) {
  //     setSugestoes([]);
  //     setDropdownVisivel(false);
  //     return;
  //   }
  //   const url = `http://api.geonames.org/searchJSON?q=${input}&maxRows=10&username=brunogomes`;
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     const cidadesUnicas = data.geonames.filter(
  //       (cidade, index, self) =>
  //         index ===
  //         self.findIndex(
  //           (c) => c.name.toLowerCase() === cidade.name.toLowerCase()
  //         )
  //     );
  //     setSugestoes(cidadesUnicas);
  //     setIndiceSelecionado(0);
  //     setDropdownVisivel(true);
  //   } catch (error) {
  //     console.error("Erro ao buscar sugestões:", error.message);
  //   }
  // };

  const buscarSugestoes = async (input) => {
    if (!input) {
      setSugestoes([]);
      return;
    }
    const url = `http://api.geonames.org/searchJSON?q=${input}&maxRows=10&username=anatrindade`;
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

      const descricao = data.weather[0].main.toLowerCase();
      if (descricao.includes("clear")) setBackgroundClass("ensolarado");
      else if (descricao.includes("cloud")) setBackgroundClass("nublado");
      else if (descricao.includes("rain")) setBackgroundClass("chuvoso");
      else if (descricao.includes("snow")) setBackgroundClass("nevando");
      else setBackgroundClass("padrao"); 
    } catch (error) {
      console.error(error.message);
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
  };

  return (
    <div className="card-previsao">
      <h1>Digite o nome da cidade</h1>
      <div className="input-cidade">
        <Autocomplete
          className="autocomplete"
          options={sugestoes.map((s) => s.name)}
          value={cidade}
          onChange={(event, newValue) => {
            setCidade(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            buscarSugestoes(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              className="input-autocomplete"
              {...params}
              onKeyDown={(e) => {
                if (e.key === "Enter" && cidade) {
                  buscarClima();
                }
              }}
            />
          )}
        />

        <Button className="botao-buscar" variant="contained" onClick={buscarClima}><SearchRoundedIcon/></Button>
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
              {obterIconeClima()}
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
                <WbTwilightIcon style={{ color: "yellow", marginRight:"5px" }} />
                {new Date(dadosClima.sys.sunrise * 1000).toLocaleTimeString(
                  [],
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </div>
              <div>
                <ModeNightIcon style={{ color: "white", marginRight:"5px" }} />
                {new Date(dadosClima.sys.sunset * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div className="vento-umidade">
              <div>
                <AirRoundedIcon style={{ color: "white", marginRight:"5px" }} />
                {dadosClima.wind.speed} m/s
              </div>
              <div>
                <WaterDropRoundedIcon style={{ color: "white" }}/> {dadosClima.main.humidity}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponentePrevisao;
