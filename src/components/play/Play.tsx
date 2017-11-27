import { Bind } from 'lodash-decorators';
import * as React from 'react';

import * as Events from '../../events';
import { PlayOption } from '../../models';
import { getPlayOptionsWinner, getRandomPlayOption } from '../../options';
import { registerGame } from '../../stats';

import Playing from './playing/Playing';
import Result from './result/Result';

import './Play.scss';

export interface PlayState {
  readonly playing: boolean;

  readonly countdown?: number;
  readonly countdownTimer?: any;

  readonly newComputerOptionDelay?: number;
  readonly newComputerOptionTimeout?: any;

  readonly player?: PlayOption;
  readonly computer: PlayOption;
}

const defaultComputerChoiceDelay = 10;
const defaultCountdown = 3;

export default class Play extends React.PureComponent<any, PlayState> {
  constructor(props: any) {
    super(props);
    this.state = this.getNewGameState();
  }

  public componentWillUnmount() {
    clearInterval(this.state.countdownTimer);
    clearTimeout(this.state.newComputerOptionTimeout);
  }

  public render() {
    const { computer, countdown, playing, player } = this.state;

    return (
      <div className="play-view">
        {
          playing
            ? <Playing countdown={countdown} player={player} computer={computer} selectOption={this.select} />
            : <Result computer={computer} player={player} />
        }
        {
          playing
            ? null
            : (
              <button onClick={this.playGame} className="btn btn-play">
                Play Again
              </button>
            )
        }
      </div>
    );
  }

  @Bind()
  private playGame() {
    this.setState(this.getNewGameState());
  }

  @Bind()
  private getNewGameState(): PlayState {
    const countdownTimer = setInterval(this.onCountdownUpdate, 1000);
    const newComputerOptionTimeout = setTimeout(this.onUpdateComputerOption, defaultComputerChoiceDelay);

    return {
      ...this.state,
      computer: getRandomPlayOption(),
      countdown: defaultCountdown,
      countdownTimer,
      newComputerOptionDelay: defaultComputerChoiceDelay,
      newComputerOptionTimeout,
      player: undefined,
      playing: true,
    };
  }

  @Bind()
  private onCountdownUpdate() {
    const timeLeft = this.state.countdown - 1;

    if (timeLeft > 0) {
      this.setState({
        ...this.state,
        countdown: timeLeft,
      });
    } else {
      this.onGameEnd();
    }
  }

  @Bind()
  private onGameEnd() {
    clearInterval(this.state.countdownTimer);
    clearTimeout(this.state.newComputerOptionTimeout);

    const winner = getPlayOptionsWinner(this.state.player, this.state.computer);
    registerGame(winner === this.state.player);

    Events.emit(Events.Event.GAME_END);

    this.setState({
      ...this.state,
      countdown: 0,
      countdownTimer: undefined,
      newComputerOptionDelay: undefined,
      newComputerOptionTimeout: undefined,
      playing: false,
    });
  }

  @Bind()
  private onUpdateComputerOption() {
    let newOption = getRandomPlayOption();
    while (newOption === this.state.computer) {
      newOption = getRandomPlayOption();
    }

    const newDelay = Math.min(1000, this.state.newComputerOptionDelay * 1.11);

    this.setState({
      ...this.state,
      computer: newOption,
      newComputerOptionDelay: newDelay,
      newComputerOptionTimeout: setTimeout(this.onUpdateComputerOption, newDelay),
    });
  }

  @Bind()
  private select(option: PlayOption): () => void {
    return () => {
      this.setState({
        ...this.state,
        player: option,
      });
    };
  }
}
