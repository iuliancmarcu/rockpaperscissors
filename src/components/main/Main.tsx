import * as React from 'react';
import { Link } from 'react-router-dom';

import './Main.scss';

export default class Main extends React.PureComponent {
  public render() {
    return (
      <div className="main-view">
        <h1>Rock 👊, paper 🖐️ and scissors ✌️</h1>
        <Link to="/play" className="btn btn-play">
          Let's play!
        </Link>
      </div>
    );
  }
}
