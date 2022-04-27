import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import App from './App';
import store from './store/store';

const root = createRoot(document.getElementById('root'));

root.render(
  <>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
);
