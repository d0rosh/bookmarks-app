app.directive('iAnimate' ,function(){
  return {
		restrict: 'A',
	    link: function(scope,elem,attrs){
	    	var span = elem.parent().find('span');
	    	elem.bind('focus', function(evt){
	    		span.addClass('active-span');
	    		elem.addClass('active-input');
	    	})

	    	elem.bind('focusout', function(){
	    		if (elem.val().length == 0) {
	    			span.removeClass('active-span');
	    			elem.removeClass('active-input');
	    		}
	    	});

	    	scope.$on('focusout', function() {
		        span.removeClass('active-span');
		        elem.removeClass('active-input');
		    });

		    scope.$on('focus', function(){
		    	span.addClass('active-span');
	    		elem.addClass('active-input');
		    });
	    }
	}
});