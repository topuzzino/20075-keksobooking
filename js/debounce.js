'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    };
  };
})();
