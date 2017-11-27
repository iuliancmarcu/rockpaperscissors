import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';

import Info from '../../src/components/info/Info';
import { PlayOption } from '../../src/models';

describe('Info', () => {
  let infoNode: Element;

  beforeEach(() => {
    const info = TestUtils.renderIntoDocument(
      <Info />,
    ) as React.ReactInstance;

    infoNode = ReactDOM.findDOMNode(info);
  });

  it('is rendered', () => {
    expect(infoNode.textContent).toMatch(/Rules/);
  });

  it('contains Rules and Stats', () => {
    const rules = infoNode.getElementsByClassName('rules')[0];
    expect(rules).toBeDefined();

    const stats = infoNode.getElementsByClassName('stats')[0];
    expect(stats).toBeDefined();
  });

  describe('Rules', () => {
    it('contains as many rules as play options', () => {
      const rules = infoNode.getElementsByClassName('rule');
      expect(rules.length).toBe(Object.keys(PlayOption).length);
    });
  });

  describe('Stats', () => {
    let statsNode: Element;

    beforeEach(() => {
      statsNode = infoNode.getElementsByClassName('stats')[0];
    });

    it('contains games played stat', () => {
      expect(statsNode.textContent).toMatch(/Games played:\s*[0-9]+/);
    });

    it('contains games won stat', () => {
      expect(statsNode.textContent).toMatch(/Games won:\s*[0-9]+/);
    });

    it('contains clear stats button', () => {
      const clearStatsButtonNode = statsNode.getElementsByClassName('btn-clear-stats')[0];
      expect(clearStatsButtonNode).toBeDefined();
      expect(clearStatsButtonNode.textContent).toBe('Clear stats');
    });
  });
});
