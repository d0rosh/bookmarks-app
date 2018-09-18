app.controller('homeCtrl', 
    ['$firebaseArray','bkmServices','$timeout', '$location','stgServices','$localStorage','$scope', function($firebaseArray, bkmServices, $timeout, $location, stgServices,$localStorage,$scope){
	var vm = this;
	vm.bookmarks = [];
	vm.selectedItem = {};
	vm.noticeMsg = '';
	vm.showLoader = true;
	bkmServices.getBkm().then(
		function(res){
			if (vm.showBkm == true) {
				$timeout(function(){
					vm.bookmarks = res;
					vm.showLoader = false;
				},2000)
			}else{
				$scope.$apply(function(){
					vm.showLoader = false;
				});
			}
			
		}
	)
	var settings = stgServices.getSettings();
	vm.bg = settings.bg;
	vm.showBkm = settings.showBkm;
	var zoom = settings.pzm;
	var fontSize = settings.fsz;
	vm.pageStyle = {
		'zoom': zoom,
		'-moz-transform': 'scale(' + zoom + ')',
		'font-size': fontSize
	}

	vm.editItem = function(data) {
		vm.selectedItem = angular.copy(data);
		$scope.$broadcast('focus');
	}

	vm.cancelUpdate = function(){
		vm.selectedItem = {};
		$scope.$broadcast('focusout');
	}

	vm.saveItem = function(data){
		if (data.$id) {
			bkmServices.updateBkm(data);
			vm.noticeMsg = "Successfully updated!";
			console.log(vm.noticeMsg)
			vm.selectedItem = {};
		}else {
			bkmServices.saveBkm(data);
			vm.noticeMsg = 'Successfully added';
			vm.selectedItem = {};
		}
		$scope.$broadcast('focusout');
	}

	vm.goToStg = function(evt){
		evt.preventDefault();
		evt.target.classList.add('rotate');
		$timeout(function() {
			$location.path('/settings');
		}, 1500);
	}


}]);