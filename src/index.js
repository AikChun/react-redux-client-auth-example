import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Header from './components/header';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers)

if (localStorage.getItem('token')) {
	// we need to update the applicate state
	store.dispatch({ type:AUTH_USER })
}

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <div>
				<Route path="/" component={ App }/>
				<Switch>
					<Route path="/signin" component={ Signin }/>
					<Route path="/signout" component={ Signout }/>
					<Route path="/signup" component={ Signup }/>
          <Route path="/feature" component={ RequireAuth(Feature) }/>
				</Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
