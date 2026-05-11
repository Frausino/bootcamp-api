import { useState } from "react";
import { buscarCEP } from "./services/viacepService";

function App() {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function consultarCEP() {
    try {
      setErro("");
      setLoading(true);

      const resultado = await buscarCEP(cep);

      setDados(resultado);
    } catch (err) {
      setErro(err.message);
      setDados(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>Consulta de CEP</h1>

      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />

      <button onClick={consultarCEP}>Buscar</button>

      {loading && <p>Carregando...</p>}

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {dados && (
        <div>
          <h2>Resultado</h2>

          <p>
            <strong>Rua:</strong> {dados.logradouro}
          </p>

          <p>
            <strong>Bairro:</strong> {dados.bairro}
          </p>

          <p>
            <strong>Cidade:</strong> {dados.localidade}
          </p>

          <p>
            <strong>UF:</strong> {dados.uf}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
