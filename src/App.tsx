import { ThemeProvider } from 'styled-components';
import Canvas from './components/Atoms/Canvas/Canvas';
//import dotenv from 'dotenv';
import GlobalStyle from './Theme/GlobalStyles';
import { theme } from './Theme/theme';

function App() {
  //dotenv.config();
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Canvas />
      </ThemeProvider>
    </>
  );
}

export default App;

