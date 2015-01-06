(function() {
    'use strict';

    angular
        .module('app')
        .directive('clickOutside', clickOutside);

    /* @ngInject */
    function clickOutside ($document) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.bind('click', function(e) {
            // this part keeps it from firing the click on the document.
            e.stopPropagation();
          });
          $document.bind('click', function() {
            // magic here.
            console.log('clicking outside');
            scope.$apply(attrs.clickOutside);
          })
        }
    }
})();