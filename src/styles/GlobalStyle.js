import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body { 
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
    font-family: 'Noto Sans KR', sans-serif;
  }

  a {
    text-decoration: none;
  }

  input {
    &:focus {
      outline: none;
    }
  }

`;

export default GlobalStyle;
