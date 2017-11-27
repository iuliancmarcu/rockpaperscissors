import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const rootEl = document.getElementsByClassName('app-root')[0];

render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl,
);

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
  module.hot.accept('./components/App', () => {
    // tslint:disable-next-line:variable-name
    const NewApp = require('./components/App').default;

    render(
      <AppContainer>
        <NewApp />
      </AppContainer>,
      rootEl,
    );
  });
}
