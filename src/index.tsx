declare var window:any;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {observableTodoStore} from './Todo/TodoStore';
import {Router, Route} from 'react-router-dom'
import App from './App';
import Callback from './Callback/Callback';
import Home from './Home/Home';
import Auth from './Auth/Auth';
import history from './history';
import TodoList from './Todo/TodoList';
import {authStore} from "./Store/AuthStore";
import {Provider} from "mobx-react";
import { useStrict } from 'mobx';

const auth = new Auth();

const stores = {
  authStore,
};

const MyApp = () => {
  return (
    <Provider {...stores}>
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />}/>
          <Route path="/home" render={(props) => {
            return (
              <div>
                <Home {...props} />
                <TodoList store={observableTodoStore}/>
              </div>
            )
          }}/>
          <Route path="/callback" render={(props) => {
            auth.handleAuthentication();
            return <Callback {...props} />
          }}/>
        </div>
      </Router>
    </Provider>
  )
};

window._____APP_STATE_____ = stores;
useStrict(true);
ReactDOM.render(<MyApp/>, document.getElementById('root'));

registerServiceWorker();
