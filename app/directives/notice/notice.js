app.directive('notice', ['$timeout' , function($timeout){
  return {
		scope:{
			message: '='	
		},
		restrict: 'E',
		transclude: false,
	    replace: false,
	    templateUrl:'/directives/notice/notice.html',
        link: function(scope, elem, attr) {   	
            scope.$watch('message', function(newValue, oldValue) {
                if (newValue) {
                	elem.addClass('open');
                    $timeout(function() {
                    	elem.removeClass('open');
	            		scope.message = '';
	            	}, 2000);
            	}
            });
        }
	}
}]);