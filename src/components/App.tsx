import { Bind } from 'lodash-decorators';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Info from './info/Info';
import Main from './main/Main';
import Play from './play/Play';

import 'flexboxgrid/dist/flexboxgrid.min.css';
import './App.scss';

export default class App extends React.PureComponent {
  public render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-8 content">
          <Router>
            <Switch>
              <Route path="/play" component={Play} />
              <Route path="/" component={Main} />
            </Switch>
          </Router>
        </div>
        <div className="col-xs-12 col-md-4 last-xs first-md">
          <Info />
        </div>
      </div>
    );
  }
}
