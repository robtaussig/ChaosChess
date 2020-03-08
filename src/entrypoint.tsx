import './style.scss';
import React from 'react';
import { render } from 'react-dom';
import { App } from '~/components/App';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { Provider } from 'react-redux';
import store from './redux/store';

render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);


if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("[PWA Builder] active service worker found, no need to register");
  } else {
    // Register the service worker
    navigator.serviceWorker
      .register("sw.js", {
        scope: "./"
      })
      .then(function (reg) {
        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
      });
  }
}

if ((module as any).hot) {
  (module as any).hot.accept()
}
