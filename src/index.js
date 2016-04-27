import React from 'react';
import App from './containers/app-container.js';
import $ from 'jquery';
require('../stylesheets/main.sass');

$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
  var token;
  if (!options.crossDomain) {
    token = $('meta[name="csrf-token"]').attr('content');
    if (token) {
      return jqXHR.setRequestHeader('X-CSRF-Token', token);
    }
  }
});

$(() => React.render(<App/>, document.body));

