import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';

import Playing from '../../src/components/play/playing/Playing';
import { PlayOption } from '../../src/models';

describe('Playing', () => {
  it('is rendered', () => {
    const playing = TestUtils.renderIntoDocument(
      // tslint:disable-next-line:jsx-no-lambda
      <Playing selectOption={() => null} computer={PlayOption.PAPER} countdown={3} />,
    ) as React.ReactInstance;

    const playingNode = ReactDOM.findDOMNode(playing);

    expect(playingNode.textContent).toMatch(/Select an option or press the key in paranthesis:/);
  });

  it('contains a "countdown" node', () => {
    const playing = TestUtils.renderIntoDocument(
      // tslint:disable-next-line:jsx-no-lambda
      <Playing selectOption={() => null} computer={PlayOption.PAPER} countdown={3} />,
    ) as React.ReactInstance;

    const playingNode = ReactDOM.findDOMNode(playing);
    const countdownNode = playingNode.getElementsByClassName('countdown')[0];

    expect(countdownNode).toBeDefined();
  });

  describe('Countdown', () => {
    it('is bound to "countdown" prop', () => {
      const count = 123;
      const playing = TestUtils.renderIntoDocument(
        // tslint:disable-next-line:jsx-no-lambda
        <Playing selectOption={() => null} computer={PlayOption.PAPER} countdown={count} />,
      ) as React.ReactInstance;

      const playingNode = ReactDOM.findDOMNode(playing);
      const countdownNode = playingNode.getElementsByClassName('countdown')[0];

      expect(countdownNode.textContent).toMatch(/123/);
    });

    it('shows current computer choice symbol', () => {
      const playing = TestUtils.renderIntoDocument(
        // tslint:disable-next-line:jsx-no-lambda
        <Playing selectOption={() => null} computer={PlayOption.PAPER} countdown={1} />,
      ) as React.ReactInstance;

      const playingNode = ReactDOM.findDOMNode(playing);
      const countdownNode = playingNode.getElementsByClassName('countdown')[0];

      expect(countdownNode.textContent).toMatch(/🖐️/);
    });
  });

  it('contains a "options" node', () => {
    const playing = TestUtils.renderIntoDocument(
      // tslint:disable-next-line:jsx-no-lambda
      <Playing selectOption={() => null} computer={PlayOption.PAPER} countdown={3} />,
    ) as React.ReactInstance;

    const playingNode = ReactDOM.findDOMNode(playing);
    const optionsNode = playingNode.getElementsByClassName('options')[0];

    expect(optionsNode).toBeDefined();
  });

  describe('Options', () => {
    it('contains a description', () => {
      const playing = TestUtils.renderIntoDocument(
        // tslint:disable-next-line:jsx-no-lambda
        <Playing selectOption={() => null} computer={PlayOption.PAPER} countdown={3} />,
      ) as React.ReactInstance;

      const playingNode = ReactDOM.findDOMNode(playing);
      const optionsNode = playingNode.getElementsByClassName('options')[0];
      const descriptionNode = optionsNode.getElementsByClassName('description')[0];

      expect(descriptionNode).toBeDefined();
      expect(descriptionNode.textContent).toBe('Select an option or press the key in paranthesis:');
    });

    it('contains all the play options', () => {
      const playing = TestUtils.renderIntoDocument(
        // tslint:disable-next-line:jsx-no-lambda
        <Playing selectOption={() => null} computer={PlayOption.PAPER} countdown={3} />,
      ) as React.ReactInstance;

      const playingNode = ReactDOM.findDOMNode(playing);
      const optionsNode = playingNode.getElementsByClassName('options')[0];

      const totalOptions = Object.keys(PlayOption).length;

      const options = optionsNode.getElementsByClassName('btn-option');
      expect(options.length).toBe(totalOptions);
    });

    it('option click calls the "selectOption" function with the option', () => {
      const selectOption = jest.fn();

      const playing = TestUtils.renderIntoDocument(
        // tslint:disable-next-line:jsx-no-lambda
        <Playing selectOption={selectOption} computer={PlayOption.PAPER} countdown={3} />,
      ) as React.ReactInstance;

      const playingNode = ReactDOM.findDOMNode(playing);
      const optionsNode = playingNode.getElementsByClassName('options')[0];
      const firstOption = optionsNode.getElementsByClassName('btn-option')[0];

      TestUtils.Simulate.click(firstOption);

      expect(selectOption).toBeCalledWith(PlayOption.ROCK);
    });
  });
});
