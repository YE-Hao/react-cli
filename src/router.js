import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import Test from './Test';
import PageOne from '@/pages/page-one';
import PageTwo from '@/pages/page-two';
export default function router() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Test}/>
        <Route exact path="/pageone" component={PageOne}/>
        <Route exact path="/pagetwo" component={PageTwo}/>
      </Switch>
    </Router>
  );
}