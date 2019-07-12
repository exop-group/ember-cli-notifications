'use strict';

const Funnel = require('broccoli-funnel');
const path = require('path');
const fs = require('fs');

module.exports = {
  name: 'ember-cli-notifications',

  included: function(/* app */) {
    this._super.included.apply(this, arguments);
  }
};
