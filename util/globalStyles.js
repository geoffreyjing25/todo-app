import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body, html {
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    font-size: 1rem;
    min-height: 100%; 
};

body {
  min-height: 100vh;
};

* {
  box-sizing: border-box;
};

`;

export default GlobalStyle;
