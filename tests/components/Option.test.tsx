import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';

import Option from '../../src/components/play/option/Option';

describe('Option', () => {
  it('is rendered', () => {
    const option = TestUtils.renderIntoDocument(
      // tslint:disable-next-line:jsx-no-lambda
      <Option name="foo" selected={false} onClick={() => undefined} />,
    ) as React.ReactInstance;

    const optionNode = ReactDOM.findDOMNode(option);

    expect(optionNode.textContent.trim()).toBe('foo');
  });

  it('displays name, symbol and keyBind if provided', () => {
    const option = TestUtils.renderIntoDocument(
      // tslint:disable-next-line:jsx-no-lambda
      <Option name="foo" symbol="bar" keyBind="baz" selected={false} onClick={() => undefined} />,
    ) as React.ReactInstance;

    const optionNode = ReactDOM.findDOMNode(option);

    expect(optionNode.textContent).toBe('foo bar (baz)');
  });

  it('has the "selected" class when selected=true', () => {
    const option = TestUtils.renderIntoDocument(
      // tslint:disable-next-line:jsx-no-lambda
      <Option name="foo" selected={true} onClick={() => undefined} />,
    ) as React.ReactInstance;

    const optionNode = ReactDOM.findDOMNode(option);

    expect(optionNode.className).toMatch(/selected/);
  });

  it('calls the onClick provided function when clicked', () => {
    const onClickFun = jest.fn();

    const option = TestUtils.renderIntoDocument(
      <Option name="foo" selected={true} onClick={onClickFun} />,
    ) as React.ReactInstance;

    const optionNode = ReactDOM.findDOMNode(option);
    TestUtils.Simulate.click(optionNode);

    expect(onClickFun).toBeCalled();
  });
});
