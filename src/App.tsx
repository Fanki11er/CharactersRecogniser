import { ThemeProvider } from 'styled-components';
import MyCanvas from './components/Molecules/MyCanvas/MyCanvas';
import NormalizedDataProvider from './Providers/NormalizedDataProvider';
import StatusInfoProvider from './Providers/StatusInfoProvider';
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
          <StatusInfoProvider>
            <MyCanvas />
          </StatusInfoProvider>
        </NormalizedDataProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

