import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: inherit;
    }
    html {
        font-size: 62.5%;
        box-sizing: border-box;
        @media (max-width: ${({ theme }) => theme.mobile}) {
            font-size: 55.5%;
        }
    }
    body {
        font-family: 'Montserrat', sans-serif;
        color: #000;
    }
    
    img {
        width: "100%"
    }

`;

export default GlobalStyles;