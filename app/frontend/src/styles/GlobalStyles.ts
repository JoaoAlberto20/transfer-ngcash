import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.GREEN_500};
  }

  body {
    background-color: ${({ theme }) => theme.GRAY_800};
    color: ${({ theme }) => theme.GRAY_100};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 1rem  Roboto, sans-serif;
    line-height: 1.6;
  }
  
  input, textarea, button {
    border: 0;
  }

  a {
    text-decoration: none;
  }
`
