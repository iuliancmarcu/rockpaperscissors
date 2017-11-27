import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';

import Result from '../../src/components/play/result/Result';
import { PlayOption } from '../../src/models';

describe('Result', () => {
  it('is rendered', () => {
    const result = TestUtils.renderIntoDocument(
      <Result player={PlayOption.ROCK} computer={PlayOption.SCISSORS} />,
    ) as React.ReactInstance;

    const resultNode = ReactDOM.findDOMNode(result);

    expect(resultNode.textContent).toMatch(/Your choice was Rock and the computer chose Scissors./);
  });

  describe('Options', () => {
    it('is not visible if player choice is none', () => {
      const result = TestUtils.renderIntoDocument(
        <Result player={undefined} computer={PlayOption.SCISSORS} />,
      ) as React.ReactInstance;

      const resultNode = ReactDOM.findDOMNode(result);
      const optionsNode = resultNode.getElementsByClassName('options')[0];

      expect(optionsNode).toBeUndefined();
    });

    it('displays options symbols', () => {
      const result = TestUtils.renderIntoDocument(
        <Result player={PlayOption.ROCK} computer={PlayOption.SCISSORS} />,
      ) as React.ReactInstance;

      const resultNode = ReactDOM.findDOMNode(result);
      const optionsNode = resultNode.getElementsByClassName('options')[0];

      expect(optionsNode).toBeDefined();
      expect(optionsNode.textContent).toBe('👊 vs ✌️');
    });
  });

  it('contains a "description" node', () => {
    const result = TestUtils.renderIntoDocument(
      <Result player={undefined} computer={PlayOption.SCISSORS} />,
    ) as React.ReactInstance;

    const resultNode = ReactDOM.findDOMNode(result);
    const descriptionNode = resultNode.getElementsByClassName('description')[0];
    expect(descriptionNode).toBeDefined();
  });

  describe('Description', () => {
    it('shows that player chose none if player choice is none', () => {
      const result = TestUtils.renderIntoDocument(
        <Result player={undefined} computer={PlayOption.SCISSORS} />,
      ) as React.ReactInstance;

      const resultNode = ReactDOM.findDOMNode(result);
      const descriptionNode = resultNode.getElementsByClassName('description')[0];
      expect(descriptionNode.textContent).toBe('Your choice was none and the computer chose Scissors.');
    });

    it('shows player and computer choices', () => {
      const result = TestUtils.renderIntoDocument(
        <Result player={PlayOption.ROCK} computer={PlayOption.SCISSORS} />,
      ) as React.ReactInstance;

      const resultNode = ReactDOM.findDOMNode(result);
      const descriptionNode = resultNode.getElementsByClassName('description')[0];
      expect(descriptionNode.textContent).toBe('Your choice was Rock and the computer chose Scissors.');
    });
  });

  it('contains a "result" node', () => {
    const result = TestUtils.renderIntoDocument(
      <Result player={PlayOption.ROCK} computer={PlayOption.ROCK} />,
    ) as React.ReactInstance;

    const resultNode = ReactDOM.findDOMNode(result);
    const resultResultNode = resultNode.getElementsByClassName('result')[0];
    expect(resultResultNode).toBeDefined();
  });

  describe('Result', () => {
    it('shows draw if it is a draw', () => {
      const result = TestUtils.renderIntoDocument(
        <Result player={PlayOption.ROCK} computer={PlayOption.ROCK} />,
      ) as React.ReactInstance;

      const resultNode = ReactDOM.findDOMNode(result);
      const resultResultNode = resultNode.getElementsByClassName('result')[0];
      expect(resultResultNode.textContent).toBe('It\'s a draw!');
    });

    it('shows "You won" if player wins', () => {
      const result = TestUtils.renderIntoDocument(
        <Result player={PlayOption.ROCK} computer={PlayOption.SCISSORS} />,
      ) as React.ReactInstance;

      const resultNode = ReactDOM.findDOMNode(result);
      const resultResultNode = resultNode.getElementsByClassName('result')[0];
      expect(resultResultNode.textContent).toBe('You won!');
    });

    it('shows "You lost" if player loses', () => {
      const result = TestUtils.renderIntoDocument(
        <Result player={PlayOption.SCISSORS} computer={PlayOption.ROCK} />,
      ) as React.ReactInstance;

      const resultNode = ReactDOM.findDOMNode(result);
      const resultResultNode = resultNode.getElementsByClassName('result')[0];
      expect(resultResultNode.textContent).toBe('You lost!');
    });
  });
});
