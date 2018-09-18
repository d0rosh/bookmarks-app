app.directive('activeUser' ,function(){
  return {
		restrict: 'A',
	    link: function(scope,elem,attrs){
	    	var wrapper = elem.parent();
	    	elem.bind('click', function(){
	    		if (scope.user.role == "admin") {
	    			wrapper.css('border-color', '#42526e');
	    			wrapper.css('transition', '0.6s');
	    		}
	    	});

	    	scope.$on('delborder', function() {
	    		wrapper.css('border-color', '#fff');
	    		wrapper.css('transition', '0.6s');
		    });
	    }
	}
});