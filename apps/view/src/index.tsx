import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import App from './App';
import store from './store/store';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { LSMap } from '@/common/helpers/LSMap';

render(
  <>
    <CssBaseline />
    <Provider store={store}>
      <SWRConfig value={{ provider: () => new LSMap() }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SWRConfig>
    </Provider>
  </>,
  document.getElementById('root'),
);
