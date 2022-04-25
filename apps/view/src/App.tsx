import { connect, ConnectedProps } from 'react-redux';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import { ApplicationState } from './store';

const connector = connect((_state: ApplicationState) => ({}), {});

function App(_props: ConnectedProps<typeof connector>) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default connector(App);
