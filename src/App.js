import React, { Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import DefaultLayout from './components/DefaultLayout';
import routes from './routes/routes';

const Login = React.lazy(() => import('./components/SignIn'));

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Login />} />

          <Route exact path="/" element={<DefaultLayout />} /> 
          <Route
            path="/*"
            element={
              <DefaultLayout>
                <Routes>
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                      exact={route.exact}
                    />
                  ))}
                </Routes>
              </DefaultLayout>
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
 