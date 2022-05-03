import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

*, *::before, *::after {
    box-sizing: border-box ;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
html{
    font-size:62.5% ;
    margin:0 ;
    padding:0 ; 

 
}
body {
    font-size:1.6rem ;
    margin:0 ;
    padding:0 ; 
    display: flex;
   padding-left: 200px ;
 
}`;

export default GlobalStyle;
