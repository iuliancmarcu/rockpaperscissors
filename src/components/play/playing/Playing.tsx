import * as React from 'react';

import { PlayOption } from '../../../models';
import { getPlayOptionConfig } from '../../../options';
import Option from '../option/Option';

import './Playing.scss';

export interface PlayingProps {
  readonly selectOption: (option: PlayOption) => () => void;
  readonly countdown: number;

  readonly player?: PlayOption;
  readonly computer: PlayOption;
}

export default class Playing extends React.PureComponent<PlayingProps> {
  public render() {
    const { computer, countdown, player, selectOption } = this.props;

    const playOptions = Object.keys(PlayOption).map(op => {
      const option = PlayOption[op];
      const optionConfig = getPlayOptionConfig(option);

      return (
        <Option
          key={op}
          onClick={selectOption(option)}
          keyBind={optionConfig && optionConfig.key}
          name={optionConfig && optionConfig.label || option}
          symbol={optionConfig && optionConfig.symbol}
          selected={player === option}
        />
      );
    });

    const computerConfig = getPlayOptionConfig(computer);

    return (
      <div className="playing-view">
        <div className="panel countdown">
          <div className="fade-out">
            {countdown}
          </div>
          {computerConfig.symbol}
        </div>
        <div className="options">
          <div className="description">Select an option or press the key in paranthesis:</div>
          {playOptions}
        </div>
      </div>
    );
  }
}
