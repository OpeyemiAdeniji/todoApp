import React, { Suspense, suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainLoader from './components/helpers/MainLoader';
import DashboardLayout from './components/layouts/DashboardLayout';
import CountryState from './context/countries/countryState'
import UserState from './context/user/userState';

const Home = React.lazy(() => import('./components/pages/Home'));  // lazy delay pages for few seconds because of API calls
const NotFound = React.lazy(() => import('./components/pages/404'));
const Login = React.lazy(() => import('./components/pages/auth/Login'));
const Register = React.lazy(() => import('./components/pages/auth/Register'));
const DashboardHome = React.lazy(() => import ('./components/pages/dashboard/Home'))
// const DropSelect = React.lazy(() => import('./components/layouts/partials/DropSelect'));

const App = () => {

  return(

    <Router>
       
      <UserState>

        <CountryState>

          <Suspense fallback={MainLoader()}>

              <Switch>

                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/dashboard" component={DashboardLayout(DashboardHome)} />

                  {/* <Route exact path="/select" component={DropSelect} /> */}

                  <Route exact path="*" component={NotFound} />   

              </Switch>

          </Suspense>

        </CountryState>
        
      </UserState>

    </Router>

  )

}

export default App;