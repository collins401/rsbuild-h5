import { lazy } from 'react';
import { Redirect, Route, Switch } from 'wouter';
import MainTabLayout from '@/pages/mainTab/_layout';
import Index from '@/pages/mainTab/home';
import NotFound from '@/pages/not-found';

const Todo = lazy(() => import('@/pages/mainTab/todo'));
const User = lazy(() => import('@/pages/mainTab/user'));
const Profile = lazy(() => import('@/pages/profile.$id'));
const SignIn = lazy(() => import('@/pages/sign-in'));
const Demo = lazy(() => import('@/pages/form'));
// const Profile = lazy(() => import('@/pages/profile.$id'));

function PrivateRoute({ children, ...props }) {
  const isAuthenticated = localStorage.getItem('token');

  // 始终返回 Route，让 Route 先判断路径是否匹配
  return (
    <Route {...props}>
      {/* 只有路径匹配时，Route 才会渲染这里面的内容 */}
      {() =>
        isAuthenticated ? children : <Redirect replace={true} to="~/sign-in" />
      }
    </Route>
  );
}

export default function Routes() {
  return (
    <Switch>
      {/* Add your routes here */}
      <Route nest path="/app">
        <MainTabLayout>
          <Route component={Index} path="/" />
          <Route component={Todo} path="/todo" />
          {/* <Route component={User} path="/user" /> */}
          <PrivateRoute path="/user">
            <User />
          </PrivateRoute>
          <Route path="/*">app 404</Route>
        </MainTabLayout>
      </Route>
      <Route path="/">
        <Redirect to="/app" />
      </Route>
      <PrivateRoute path="/profile/:id">
        <Profile />
      </PrivateRoute>
      {/* <Route nest>
        <div>
          asChild
          <Route component={Demo} path="asd" />
        </div>
      </Route> */}
      {/* <Route component={Profile} path="/profile/:id" /> */}
      <Route component={SignIn} path="/sign-in" />
      <Route component={Demo} path="/form" />

      <Route component={NotFound} path="*" />
    </Switch>
  );
}
