import { Bind } from 'lodash-decorators';
import * as React from 'react';

import * as Events from '../../events';
import { PlayOption } from '../../models';
import { getPlayOptionConfig } from '../../options';
import { clearGameStats, getGameStats } from '../../stats';

import './Info.scss';

export interface InfoState {
  readonly onGameEndListener?: any;
}

export default class Info extends React.PureComponent<any, InfoState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    const onGameEndListener = () => {
      this.forceUpdate();
    };

    Events.addListener(Events.Event.GAME_END, onGameEndListener);

    this.setState({
      ...this.state,
      onGameEndListener,
    });
  }

  public componentWillUnmount() {
    if (this.state.onGameEndListener != null) {
      Events.removeListener(Events.Event.GAME_END, this.state.onGameEndListener);
    }
  }

  public render() {
    const rules = Object.keys(PlayOption).map(op => {
      const option = PlayOption[op];
      const config = getPlayOptionConfig(option);

      const winsOver = config.winsOver.map(o => {
        const cfg = getPlayOptionConfig(o);
        return (
          <div key={o}>
            {cfg.label} ({cfg.symbol})
          </div>
        );
      });

      return (
        <div key={op} className="rule">
          <div className="rule-title">
            {config.label} ({config.symbol}) wins vs:
          </div>
          <div className="rule-item">
            {winsOver}
          </div>
        </div>
      );
    });

    const gameStats = getGameStats();

    return (
      <div className="panel information" >
        <div className="rules">
          <h2>Rules:</h2>
          {rules}
        </div>
        <div className="stats">
          <h2>Stats:</h2>
          <div className="stat">
            <div className="stat-name">
              Games played:
            </div>
            <span className="stat-value">
              {gameStats.gamesPlayed}
            </span>
          </div>
          <div className="stat">
            <div className="stat-name">
              Games won:
            </div>
            <span className="stat-value">
              {gameStats.gamesWon}
            </span>
          </div>
          <button className="btn btn-clear-stats" onClick={this.clearStats}>
            Clear stats
          </button>
        </div>
      </div>
    );
  }

  @Bind()
  private clearStats() {
    clearGameStats();
    this.forceUpdate();
  }
}
