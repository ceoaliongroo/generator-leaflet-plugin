'use strict';
var _ = require('lodash');

module.exports = Utils;

function Utils() {
  var utils = {
    validateLeafletPrefix: validateLeafletPrefix
  };

  function hasLeafletPrefix(appname) {
    return _.startWith(appname, 'Leaflet');
  }

  return utils;
}
