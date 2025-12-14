import { Suspense } from 'react';

import Routes from './routes';

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center pt-4 text-center">Loading...</div>
      }
    >
      <Routes />
    </Suspense>
  );
};

export default App;
