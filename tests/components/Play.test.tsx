import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';

import Play from '../../src/components/play/Play';

jest.useFakeTimers();

describe('Play', () => {
  let playComponent: Play;
  let playNode: Element;

  beforeEach(() => {
    playComponent = TestUtils.renderIntoDocument(
      <Play />,
    ) as Play;

    playNode = ReactDOM.findDOMNode(playComponent);
  });

  it('is starting in playing mode', () => {
    expect(playComponent.state).toMatchObject({ playing: true });
  });

  describe('Playing', () => {
    it('shows the playing component', () => {
      const playingNode = playNode.getElementsByClassName('playing-view')[0];
      expect(playingNode).toBeDefined();
    });

    it('does not show the play again button', () => {
      const playAgainButtonNode = playNode.getElementsByClassName('btn-play')[0];
      expect(playAgainButtonNode).toBeUndefined();
    });

    it('has a interval countdown function that runs every second and decreases "countdown"', () => {
      const mockSetInterval = setInterval as any as jest.Mock;

      expect(mockSetInterval).toBeCalled();
      expect(mockSetInterval.mock.calls[0][1]).toBe(1000);

      expect(playComponent.state.countdown).toBe(3);
      jest.runTimersToTime(1000);
      expect(playComponent.state.countdown).toBe(2);
      jest.runTimersToTime(1000);
      expect(playComponent.state.countdown).toBe(1);
    });

    it('changes the computer choice from time to time, slower as time passes', () => {
      const mockSetTimeout = setTimeout as any as jest.Mock;
      const calls = mockSetTimeout.mock.calls;

      expect(mockSetTimeout).toBeCalled();
      expect(calls[0][1]).toBe(10);

      const firstComputerChoice = playComponent.state.computer;
      jest.runTimersToTime(calls[0][1] + 2);
      expect(playComponent.state.computer).not.toBe(firstComputerChoice);

      const secondComputerChoice = playComponent.state.computer;
      jest.runTimersToTime(calls[1][1] + 2);
      expect(playComponent.state.computer).not.toBe(secondComputerChoice);

      expect(calls[0][1] <= calls[1][1]
        && calls[1][1] <= calls[2][1]
        && calls[2][1] <= calls[3][1]
        && calls[3][1] <= calls[4][1]
        && calls[4][1] <= calls[5][1]);
    });

    it('ends the game when countdown reaches 0', () => {
      const onGameEndSpy = jest.spyOn(playComponent as any, 'onGameEnd');

      expect(playComponent.state).toMatchObject({
        countdown: 3,
        playing: true,
      });

      jest.runAllTimers();
      expect(onGameEndSpy).toBeCalled();

      expect(playComponent.state).toMatchObject({
        countdown: 0,
        playing: false,
      });
    });
  });

  describe('Result', () => {
    beforeEach(() => {
      (playComponent as any).onGameEnd();
    });

    it('shows the result component', () => {
      const resultNode = playNode.getElementsByClassName('result-view')[0];
      expect(resultNode).toBeDefined();
    });

    it('shows the play again button', () => {
      const playAgainButtonNode = playNode.getElementsByClassName('btn-play')[0];
      expect(playAgainButtonNode).toBeDefined();
    });

    it('plays the game when play again button is clicked', () => {
      expect(playComponent.state.playing).toBe(false);

      const playAgainButtonNode = playNode.getElementsByClassName('btn-play')[0];
      TestUtils.Simulate.click(playAgainButtonNode);

      expect(playComponent.state.playing).toBe(true);
    });
  });
});
