<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->

Olá avaliador!

No README abaixo listarei os principais tópicos de como meu código foi pensado.

# Projeto Previsão do Tempo

## 1. Apresentação do Projeto

Este projeto é um aplicativo web que apresenta informações climáticas detalhadas para cidades fornecidas pelo usuário. A aplicação permite que o usuário:

- Busque o clima atual de qualquer cidade digitando o nome.
- Visualize dados como temperatura, máxima, mínima e condições climáticas (exibidos com ícones).
- Receba sugestões de cidades pré-configuradas (por exemplo, Joinville, Florianópolis e Curitiba) com seus respectivos dados climáticos.

O objetivo do projeto é oferecer uma interface simples, moderna e responsiva para consulta de informações climáticas, utilizando dados reais obtidos de APIs externas.

## 2. Estrutura do Projeto

A organização do código segue uma estrutura modular, com os componentes principais agrupados na pasta /components.

- **src/components/ComponentePrevisao**

  - **ComponentePrevisao.jsx:** Componente central que gerencia a entrada de dados, chamadas às APIs e a exibição dos resultados climáticos.
  - **ComponentePrevisao.css:** Arquivo de estilos específico para o layout e aparência deste componente.
  - **ComponentePrevisao.test.jsx:** Testes automatizados (usando React Testing Library) que garantem a integridade do componente.

- **src/components/CidadesSugeridas**

  - **CidadesSugeridas.jsx:** Componente responsável por exibir cards com cidades pré-configuradas e seus dados climáticos.
  - **CidadesSugeridas.css:** Estilização dos cartões, garantindo responsividade e interatividade com efeitos de hover.

- **public/imagens**
  - Pasta que contém imagens de fundo para personalização dinâmica do background.

## 3. Funcionalidades e Fluxo de Uso

- **Busca de Clima por Cidade:**  
  O usuário digita o nome de uma cidade no campo de entrada (gerenciado pelo componente `Autocomplete` do Material-UI), e ao clicar no botão de busca (identificado pelo atributo `data-testid="botao-buscar"`), a aplicação consulta a API do OpenWeatherMap e exibe os dados (nome, temperatura, velocidade do vento, nascer /por do sol e umidade).

- **Sugestões de Cidades:**  
  Um componente secundário, `CidadesSugeridas.jsx`, é responsável por apresentar cartões com cidades fixas. Ao clicar em um desses cartões, os dados climáticos da cidade são buscados e apresentados no layout principal.

- **Exibição Dinâmica:**  
  O layout da aplicação é adaptável e adapta seus componentes ao clima local da cidade pesquisada.

## 4. Setup do Projeto

### Pré-requisitos

- Node.js
- npm

### Instalação

1. **Clonar o repositório:**
   git clone <URL_DO_REPOSITORIO>
   cd projeto-previsao
   npm install
   Chave da API do OpenWeatherMap: b0a67d1ae4e55e99a910ea4120918e5b
   Chave do Geonames: brunogomes
   npm start

## 5. API's externas

    OpenWeatherMap API:
    Responsável por fornecer informações climáticas reais. São consultados dados como temperatura, clima, e horários de nascer e pôr do sol.

    Geonames API:
    Utilizada para fornecer sugestões de cidades com base na entrada do usuário.

    Dependências Principais
    React: Biblioteca para construção de interfaces.

    Material-UI (@mui): Utilizada para componentes visuais modernos e responsivos, como Autocomplete, button e ícones.

    React Testing Library: Para simular interações e garantir funcionalidade dos componentes por meio de testes unitários e de integração.

## 6. Arquitetura e lógica de funções

**ComponenteComponentePrevisao.jsx**

    1. Função buscarSugestoes:
        Realiza chamadas à API do Geonames para retornar um array de sugestões de cidade baseado na entrada do usuário.

    2. Função buscarClima:
        Consulta a API do OpenWeatherMap com o nome da cidade armazenado no estado e atualiza o estado  com os resultados.

**ComponenteCidadesSugeridas.jsx:** 1. No useEffect, efetua chamadas à API do OpenWeatherMap para obter dados de cidades fixas 2. Processa e formata os dados recebidos (temperaturas arredondadas, condição climática, etc.) e os renderiza em cards. 3. A função recebe a condição climática e retorna o ícone correspondente para feedback visual.

## 7. Testes Automatizados

**Os testes utilizam a React Testing Library para simular interações e verificar a integridade dos componentes:**

1.  Testes de Renderização:
    Verificação se os elementos essenciais, como o título e o botão de busca, estão presentes.
2.  Testes de Interação:
    Simulação da digitação do nome da cidade, clique no botão de busca e verificação se os dados retornados (ex.: "Curitiba") são exibidos corretamente
3.  Utilização de jest.fn() com beforeEach e afterEach para simular as respostas das APIs e evitar chamadas reais durante os testes.

## 8. Testes Automatizados
**ComponentePrevisao.css:**
    Define o layout, cores de fundo, fontes e espaçamentos para o componente principal. 
    Inclui gradientes e imagens dinâmicas para representar condições climáticas.

**CidadesSugeridas.css:**
    Responsável por estilizar os cartões de cidades, adicionando efeitos visuais em hover 
    (como aumento de escala e mudança de cor).

**Imagens de Fundo:**
    As imagens estão localizadas na pasta public/imagens e são utilizadas para personalizar o visual do aplicativo 
    conforme a condição climática.