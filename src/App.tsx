import { ThemeProvider } from 'styled-components';
import Canvas from './components/Atoms/Canvas/Canvas';

import GlobalStyle from './Theme/GlobalStyles';
import { theme } from './Theme/theme';

function App() {
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

