import { useState } from "react";
import "./App.css";
import { buscarCEP } from "./services/viacepService";

function App() {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function consultarCEP() {
    try {
      setErro("");
      setDados(null);

      const cepLimpo = cep.replace(/\D/g, "");

      if (cepLimpo.length !== 8) {
        throw new Error("Digite um CEP válido com 8 números");
      }

      setLoading(true);

      const resultado = await buscarCEP(cepLimpo);

      setDados(resultado);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>Consulta Inteligente de CEP</h1>

          <p>
            Integração com API pública ViaCEP utilizando React, testes
            automatizados, CI/CD e deploy na nuvem.
          </p>
        </div>

        <div className="searchBox">
          <input
            type="text"
            placeholder="Digite o CEP"
            value={cep}
            maxLength={9}
            onChange={(e) => setCep(e.target.value)}
          />

          <button onClick={consultarCEP}>Buscar CEP</button>
        </div>

        {loading && <div className="loading">Consultando API...</div>}

        {erro && <div className="error">{erro}</div>}

        {dados && (
          <div className="result">
            <h2>Endereço Encontrado</h2>

            <div className="infoGrid">
              <div>
                <span>CEP</span>
                <p>{dados.cep}</p>
              </div>

              <div>
                <span>Rua</span>
                <p>{dados.logradouro}</p>
              </div>

              <div>
                <span>Bairro</span>
                <p>{dados.bairro}</p>
              </div>

              <div>
                <span>Cidade</span>
                <p>{dados.localidade}</p>
              </div>

              <div>
                <span>Estado</span>
                <p>{dados.uf}</p>
              </div>
            </div>
          </div>
        )}

        <footer>
          <a href="https://github.com/Frausino/bootcamp-api" target="_blank">
            GitHub
          </a>

          <a href="https://linkedin.com/in/davi-r-frausino" target="_blank">
            LinkedIn
          </a>

          <a href="https://bootcamp-api.vercel.app/" target="_blank">
            Deploy
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
