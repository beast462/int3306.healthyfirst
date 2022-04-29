import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import store from './store/store';
import { render } from 'react-dom';
import { theme } from './theme';

render(
  <>
    <CssBaseline />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </>,
  document.getElementById('root'),
);
