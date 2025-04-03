import { useState } from "react";
import "./ComponentePrevisao.css";

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
          <div className="resultado resultado-cidade">{dadosClima.name}</div>
          <div className="resultado resultado-temperatura-atual">
            <p>Temperatura Atual: {dadosClima.main.temp}°C</p>
          </div>
          <div className="resultado resultado-temperatura-maxima">
            <p>Máxima: {dadosClima.main.temp_max}°C</p>
          </div>
          <div className="resultado resultado-temperatura-minima">
            <p>Mínima: {dadosClima.main.temp_min}°C</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponentePrevisao;
