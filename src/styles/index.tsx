import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'PressStart2P';
    src: url('/src/assets/fonts/PressStart2P-Regular.woff2') format('woff2'),
         url('/src/assets/fonts/PressStart2P-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    }

        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        a {
            text-decoration: none;
            color: inherit;
        }
`