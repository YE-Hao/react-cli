import React from 'react';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import Test from './Test';
import PageOne from '@/pages/page-one';
import PageTwo from '@/pages/page-two';
import Camera from '@/pages/camera';
import Chart from '@/pages/camera/Chart';
export default function router() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Test}/>
        <Route exact path="/pageone" component={PageOne}/>
        <Route exact path="/pagetwo" component={PageTwo}/>
        <Route exact path="/camera" component={Camera}/>
        <Route exact path="/chart" component={Chart}/>
      </Switch>
    </Router>
  );
}