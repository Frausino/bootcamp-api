import { describe, expect, test, vi } from "vitest";
import { buscarCEP } from "../services/viacepService";

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        cep: "01001-000",
        logradouro: "Praça da Sé",
        bairro: "Sé",
        localidade: "São Paulo",
        uf: "SP",
      }),
  }),
);

describe("Busca CEP", () => {
  test("deve retornar dados válidos", async () => {
    const resultado = await buscarCEP("01001000");

    expect(resultado.localidade).toBe("São Paulo");

    expect(resultado.uf).toBe("SP");
  });
});
