import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Detail } from './Pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Task2 from './Task2';

const customHistory = createBrowserHistory();
customHistory.push(customHistory.location)

ReactDOM.render(
  <React.StrictMode>
    <Router history={customHistory}>
      <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/detail/:userID" component={Detail}/>
          <Route exact path="/task2" component={Task2}/>
      </Switch>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

