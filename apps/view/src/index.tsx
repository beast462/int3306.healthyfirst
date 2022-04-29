import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import App from './App';
import store from './store/store';
import { render } from 'react-dom';

render(
  <>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById('root'),
);
