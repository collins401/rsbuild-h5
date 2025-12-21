import { Suspense } from 'react';
import DialogContainer from './components/dialog';
import ErrorBoundary from './components/error-boundary';
import { Loading } from './components/loading';
import { ThemeProvider } from './components/theme-provider';
import ToastContainer from './components/toast';
import Routes from './routes';

const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes />
          <ToastContainer />
          <DialogContainer />
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
