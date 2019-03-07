import React from 'react';
import ReactDOM from 'react-dom';
import 'template.data.gouv.fr/dist/main.css';
import App from './App';
import { unregister as unregisterServiceWorker } from './registerServiceWorker';
import 'moment/locale/fr'; // set moment locale to french globally

ReactDOM.render(<App />, document.getElementById('root'));
unregisterServiceWorker();
