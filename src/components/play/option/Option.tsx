import * as React from 'react';

import './Option.scss';

export interface OptionProps {
  readonly keyBind?: string;
  readonly name: string;
  readonly selected: boolean;
  readonly symbol?: string;

  readonly onClick: () => void;
}

export interface OptionState {
  readonly keyListener?: any;
}

export default class Option extends React.PureComponent<OptionProps, OptionState> {
  constructor(props: OptionProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    const { keyBind, onClick } = this.props;

    if (keyBind != null) {
      const keyListener = (event: KeyboardEvent) => {
        if (event.key === keyBind.toLowerCase()) {
          onClick();
        }
      };

      document.addEventListener('keydown', keyListener, false);

      this.setState({
        ...this.state,
        keyListener,
      });
    }
  }

  public componentWillUnmount() {
    if (this.state.keyListener) {
      document.removeEventListener('keydown', this.state.keyListener, false);
    }
  }

  public render() {
    const { name, symbol, keyBind, selected, onClick } = this.props;

    return (
      <button
        className={`btn btn-option ${selected ? 'selected' : ''}`}
        onClick={onClick}
      >
        {name} {symbol} {keyBind ? `(${keyBind})` : ''}
      </button>
    );
  }
}
