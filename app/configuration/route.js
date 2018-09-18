app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
    $routeProvider.when('/', {
        templateUrl: '/pages/home/home.html',
        controller: 'homeCtrl',
        controllerAs: 'ctrl',
        data: {
           private: true
        },
        title: 'Home'
        
    });
    $routeProvider.when('/settings', {
        templateUrl: '/pages/settings/settings.html',
        controller: 'settingsCtrl',
        controllerAs: 'ctrl',
        title: 'Settings'
        
    });
  
    $routeProvider.otherwise({
		templateUrl: '/pages/error/error.html',
        title: '404 ERROR'
	});
}]);

app.run(['$rootScope',function($rootScope) { 
    $rootScope.$on('$routeChangeStart',
        function(evt, next, current) {
            $rootScope.title = next.title;
        }
    );
}]);