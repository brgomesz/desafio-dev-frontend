import { render, screen, fireEvent } from "@testing-library/react";
import ComponentePrevisao from "./ComponentePrevisao";

// Mock do fetch para simular as chamadas de API
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes("searchJSON")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            geonames: [{ name: "Curitiba", countryName: "Brasil" }],
          }),
      });
    } else if (url.includes("weather")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            weather: [{ main: "Clear" }],
            main: { temp: 25, temp_max: 30, temp_min: 20 },
            name: "Curitiba",
          }),
      });
    }
  });
});

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

// Testa se o título é renderizado
test("renderiza o título corretamente", () => {
  render(<ComponentePrevisao setBackgroundClass={() => {}} />);
  const titulo = screen.getByText(/Digite o nome da cidade/i);
  expect(titulo).toBeInTheDocument();
});

// Testa a digitação no campo
test("permite ao usuário digitar no campo de entrada", () => {
  render(<ComponentePrevisao setBackgroundClass={() => {}} />);
  const input = screen.getByRole("combobox");
  fireEvent.change(input, { target: { value: "São Paulo" } });
  expect(input.value).toBe("São Paulo");
});

test("renderiza o botão de busca", () => {
    render(<ComponentePrevisao setBackgroundClass={() => {}} />);
  
    // Procura o botão pelo atributo data-testid
    const botaoBuscar = screen.getByTestId("botao-buscar");
  
    // Verifica se o botão está presente no DOM
    expect(botaoBuscar).toBeInTheDocument();
  
    // Simula um clique no botão
    fireEvent.click(botaoBuscar);
  
    // Confirma que o clique não causou erro (não há mais validação aqui)
    expect(botaoBuscar).toBeTruthy();
  });

 