import { Suspense } from 'react';
import ErrorBoundary from './components/error-boundary';
import { Loading } from './components/loading';
import Routes from './routes';

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
