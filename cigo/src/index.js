import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './AppRoot';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <AppRoot />
  </React.StrictMode>,
  document.getElementById('root')
);
