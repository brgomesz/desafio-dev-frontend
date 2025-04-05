import { render, screen, fireEvent } from "@testing-library/react";
import ComponentePrevisao from "./ComponentePrevisao";

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

test("renderiza o título corretamente", () => {
  render(<ComponentePrevisao setBackgroundClass={() => {}} />);
  const titulo = screen.getByText(/Digite o nome da cidade/i);
  expect(titulo).toBeInTheDocument();
});

test("permite ao usuário digitar no campo de entrada", () => {
  render(<ComponentePrevisao setBackgroundClass={() => {}} />);
  const input = screen.getByRole("combobox");
  fireEvent.change(input, { target: { value: "São Paulo" } });
  expect(input.value).toBe("São Paulo");
});

test("renderiza o botão de busca", () => {
  render(<ComponentePrevisao setBackgroundClass={() => {}} />);
  const botaoBuscar = screen.getByTestId("botao-buscar");
  expect(botaoBuscar).toBeInTheDocument();
  fireEvent.click(botaoBuscar);
  expect(botaoBuscar).toBeTruthy();
});
