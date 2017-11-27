import * as React from 'react';

import { PlayOption } from '../../../models';
import { getPlayOptionConfig, getPlayOptionsWinner } from '../../../options';

import './Result.scss';

export interface ResultProps {
  readonly computer: PlayOption;
  readonly player?: PlayOption;
}

export default class Result extends React.PureComponent<ResultProps> {
  public render() {
    const { computer, player } = this.props;

    const playerConfig = player && getPlayOptionConfig(player);
    const computerConfig = getPlayOptionConfig(computer);

    const playerSymbol = playerConfig && playerConfig.symbol;
    const computerSymbol = computerConfig && computerConfig.symbol;

    const options = playerSymbol && computerSymbol
      ? (
        <div className="options">
          {playerSymbol} vs {computerSymbol}
        </div>
      )
      : null;

    const playerChoice = playerConfig != null ? playerConfig.label : player != null ? player : 'none';
    const computerChoice = computerConfig != null ? computerConfig.label : computer;

    const winner = getPlayOptionsWinner(player, computer);

    return (
      <div className="result-view">
        <div className="panel">
          {options}
          <div className="description">
            Your choice was <span className="text-bold">{playerChoice}</span> and the computer chose <span className="text-bold">{computerChoice}</span>.
          </div>
          <h1 className="result">
            {winner === player ? 'You won!' : winner === computer ? 'You lost!' : 'It\'s a draw!'}
          </h1>
        </div>
      </div>
    );
  }
}
