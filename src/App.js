import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Route, Switch} from 'react-router-dom'

import './App.css';
import Home from './containers/Home/Home';
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={Home}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
