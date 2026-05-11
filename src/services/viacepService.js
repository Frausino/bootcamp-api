export async function buscarCEP(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

  if (!response.ok) {
    throw new Error("Erro ao buscar CEP");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP inválido");
  }

  return data;
}
