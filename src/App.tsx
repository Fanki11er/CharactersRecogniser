import { ThemeProvider } from 'styled-components';
import Canvas from './components/Atoms/Canvas/Canvas';
import MyCanvas from './components/Molecules/MyCanvas/MyCanvas';
import NormalizedDataProvider from './Providers/NormalizedDataProvider';
//import dotenv from 'dotenv';
import GlobalStyle from './Theme/GlobalStyles';
import { theme } from './Theme/theme';

function App() {
  //dotenv.config();
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <NormalizedDataProvider>
        <MyCanvas />
        </NormalizedDataProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

