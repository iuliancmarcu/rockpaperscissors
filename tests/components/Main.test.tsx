import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';

import Main from '../../src/components/main/Main';

describe('Main', () => {
  let mainWithRouterNode: Element;

  beforeEach(() => {
    const info = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    ) as React.ReactInstance;

    mainWithRouterNode = ReactDOM.findDOMNode(info);
  });

  it('is rendered', () => {
    expect(mainWithRouterNode.textContent).toMatch(/Rock 👊, paper 🖐️ and scissors ✌️/);
  });

  describe('Play Button', () => {
    let playButtonNode: Element;

    beforeEach(() => {
      playButtonNode = mainWithRouterNode.getElementsByClassName('btn-play')[0];
    });

    it('exists', () => {
      expect(playButtonNode).toBeDefined();
      expect(playButtonNode.textContent).toBe('Let\'s play!');
    });

    it('is a link to "/play"', () => {
      expect(playButtonNode.tagName.toLowerCase()).toBe('a');
      expect(playButtonNode.getAttribute('href')).toBe('/play');
    });
  });
});
