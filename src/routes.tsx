import { lazy } from 'react';
import { Redirect, Route, Switch } from 'wouter';
import MainTabLayout from '@/pages/mainTab/_layout';
import Index from '@/pages/mainTab/home';
import NotFound from '@/pages/not-found';

const Todo = lazy(() => import('@/pages/mainTab/todo'));
const User = lazy(() => import('@/pages/mainTab/user'));
const Profile = lazy(() => import('@/pages/profile.$id'));
const SignIn = lazy(() => import('@/pages/sign-in'));
// const Profile = lazy(() => import('@/pages/profile.$id'));

export default function Routes() {
  return (
    <Switch>
      {/* Add your routes here */}
      <Route nest path="/app">
        <MainTabLayout>
          <Route component={Todo} path="/todo" />
          <Route component={Index} path="/" />
          <Route component={User} path="/user" />
          {/* <PrivateRoute path="/user">
            <User />
          </PrivateRoute> */}
        </MainTabLayout>
      </Route>
      <Route path="/">
        <Redirect to="/app" />
      </Route>
      <Route component={Profile} path="/profile/:id" />
      <Route component={SignIn} path="/sign-in" />

      <Route component={NotFound} path="*" />
    </Switch>
  );
}
