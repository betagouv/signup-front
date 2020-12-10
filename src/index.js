import React from 'react';
import ReactDOM from 'react-dom';
import 'template.data.gouv.fr/dist/main.css';
import App from './App';
import { unregister as unregisterServiceWorker } from './registerServiceWorker';
import 'moment/locale/fr'; // set moment locale to french globally

// Setup sentry
if (
  process.env.NODE_ENV === 'production' &&
  typeof window !== 'undefined' &&
  !!window.Raven
) {
  window.Raven.config(
    'https://40fcfa878949435bb8ff723e618b395d@sentry.data.gouv.fr/64'
  ).install();
}

ReactDOM.render(<App />, document.getElementById('root'));
unregisterServiceWorker();
