import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux';

import './App.css';
import Home from './containers/Home/Home';
import Signin from './containers/Authentication/Signin/Signin';
import Signup from './containers/Authentication/Signup/Signup';
import CreateChecklist from './containers/CreateChecklist/CreateChecklist';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions';

function App(props) {
  const autoLogin = props.autoLogin;

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/create" component={CreateChecklist} />
          <Redirect to="/"/>
        </Switch>
      </Layout>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(actions.autoLogin())
  }
}
export default connect(null, mapDispatchToProps)(App);
