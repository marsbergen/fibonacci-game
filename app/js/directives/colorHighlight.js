import 'angular';

module.exports = function($timeout) {
  return {
    restrict: 'A',
    scope: {
      colorHighlight: '='
    },
    link(scope, element) {
      scope.$watch('colorHighlight', function(newValue, oldValue) {
        //if(oldValue != newValue && newValue != 0) {
        //  element.addClass('cell--highlight');
        //  $timeout(function() {
        //    angular.element(".cell--highlight").removeClass('cell--highlight');
        //  }, 1000);
        //}

        if(oldValue != undefined && oldValue > 0 && newValue == 0) {
          element.addClass('cell--highlight-green');
          $timeout(function() {
            element.removeClass('cell--highlight-green');
          }, 1000);
        }
      });
    }
  }
};
