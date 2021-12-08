import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import launchDarkly from "./LaunchDarkly";

const launchDarklyOpts = launchDarkly(process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_ID);

ReactDOM.render(
  <React.StrictMode>
    <App featureFlagOpts={launchDarklyOpts}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
