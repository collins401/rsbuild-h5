import { Route, Switch } from 'wouter';

import Index from '@/pages/index';
import NotFound from '@/pages/not-found';
export default function Routes() {
  return (
    <Switch>
      {/* Add your routes here */}
      <Route component={Index} path="/" />
      <Route component={NotFound} path="*" />
    </Switch>
  );
}
