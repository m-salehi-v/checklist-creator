import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'

import './App.css';
import Home from './containers/Home/Home';
import Signin from './containers/Authentication/Signin/Signin';
import Signup from './containers/Authentication/Signup/Signup';
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Redirect to="/"/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
