import React, { Suspense, suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainLoader from './components/helpers/MainLoader';

const Home = React.lazy(() => import('./components/pages/Home'));  // lazy delay pages for few seconds because of API calls
const NotFound = React.lazy(() => import('./components/pages/404'));

const App = () => {

  return(

    <Router>

      <Suspense fallback={MainLoader()}>

          <Switch>

              <Route exact path="/" component={Home} />

              <Route exact path="*" component={NotFound} />  

          </Switch>

      </Suspense>

    </Router>

  )

}

export default App;