import "./ComponentePrevisao.css";

function ComponentePrevisao() {
  return (
    <div className="card-previsao">
      <h1>Digite o nome da cidade</h1>
      <div className="input-cidade">        
        <input type="text" placeholder="Digite a cidade"/>
        <button>🔎</button>
      </div>
    </div>
  );
}

export default ComponentePrevisao;
