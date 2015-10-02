'use strict';

angular.module('ccFilters', []).filter('noTransparent', function() {
  return function(colors) {
    var output = [];
    
    angular.forEach (colors, function(color) {
      if (color.color != 'transparent') {
        output.push(color);
      }
    })
    return output;
  };
});

