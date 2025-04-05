//TESTES APROVADOS:

import { render, screen, fireEvent } from '@testing-library/react';
import ComponentePrevisao from './ComponentePrevisao';

test('renderiza o título corretamente', () => {
  // Renderiza o componente no ambiente de teste
  render(<ComponentePrevisao setBackgroundClass={() => {}} />);
  
  // Procura o texto no componente
  const titulo = screen.getByText(/Digite o nome da cidade/i);

  // Verifica se o título está presente no DOM
  expect(titulo).toBeInTheDocument();
});


test('permite ao usuário digitar no campo de entrada', () => {
  // Renderiza o componente
  render(<ComponentePrevisao setBackgroundClass={() => {}} />);

  // Encontra o campo de entrada pelo atributo role
  const input = screen.getByDisplayValue('');

  // Simula a digitação no campo
  fireEvent.change(input, { target: { value: 'São Paulo' } });

  // Verifica se o valor foi atualizado corretamente
  expect(input.value).toBe('São Paulo');
});
