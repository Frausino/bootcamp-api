import { useState } from "react";
import { buscarCEP } from "./services/viacepService";
import "./App.css";

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
                throw new Error(
                    "Digite um CEP válido com 8 números"
                );
            }

            setLoading(true);

            const resultado = await buscarCEP(
                cepLimpo
            );

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
                        Integração com API pública
                        ViaCEP utilizando React,
                        testes automatizados,
                        CI/CD e deploy na nuvem.
                    </p>
                </div>

                <div className="searchBox">
                    <input
                        type="text"
                        placeholder="Digite o CEP"
                        value={cep}
                        maxLength={9}
                        onChange={(e) =>
                            setCep(e.target.value)
                        }
                    />

                    <button
                        onClick={consultarCEP}
                    >
                        Buscar CEP
                    </button>
                </div>

                {loading && (
                    <div className="loading">
                        Consultando API...
                    </div>
                )}

export default App;
