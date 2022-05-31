import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { LSMap } from '@/common/helpers/LSMap';
import { CssBaseline } from '@mui/material';

import App from './App';
import { revalidateUser } from './middlewares/revalidateUser';
import store from './store/store';

render(
  <>
    <CssBaseline />
    <Provider store={store}>
      <SWRConfig value={{ provider: () => new LSMap(), use: [revalidateUser] }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SWRConfig>
    </Provider>
  </>,
  document.getElementById('root'),
);
