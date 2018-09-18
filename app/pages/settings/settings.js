app.controller('settingsCtrl', ['$firebaseArray','userServices','stgServices','$localStorage','$timeout','$scope','bkmServices','$window', function($firebaseArray, userServices, stgServices, $localStorage, $timeout,$scope,bkmServices,$window){
	var vm = this;
	var settings = stgServices.getSettings();
	vm.users = [];
	vm.newUser = {};
	vm.genders = ['male','female'];
	vm.roles = ['user','admin'];
	vm.userPopapVisib = false;
	vm.showInput = false;
	vm.currentUser = {};
	vm.noticeMsg = '';
	vm.showAvatars = false;
	vm.userAvatars = ['boy.png','girl.png','girl1.png','girl2.png','man.png','man1.png','user.png','user1.png','user2.png'];
	vm.bg = settings.bg;
	vm.newBookmark = {}
	vm.bookmarks = [];
	vm.showBkm = settings.showBkm;
	vm.fsz = settings.fsz;
	vm.pzm = settings.pzm;
	bkmServices.getBkm().then(
		function(res){
			vm.bookmarks = res;
		}
	)
	userServices.getUsers().then(
		function(res){
			vm.users = res;
			$scope.$apply();
		}
	)
	vm.changeBg = function(){
		stgServices.setColor(vm.bg)
	}

	vm.saveUser = function(){
		if (vm.newUser.gender == 'male') {
			vm.newUser.img = 'male.png'
		}else {
			vm.newUser.img = 'female.png'
		}

		userServices.saveUser(vm.newUser);
		vm.userPopapVisib = false;
		vm.noticeMsg = 'Successfully added';
	}

	vm.editUser = function(data){
		if (data.role == 'admin') {
			vm.showInput = true;
			vm.currentUser = angular.copy(data);
			console.log(vm.currentUser)
		}else {
			vm.noticeMsg = 'This user has no rights to edit';
		}
	}

	vm.cancelEdit = function(){
		vm.showInput = false;
		vm.currentUser = {};
	}

	vm.updateUser = function(){
		userServices.updateUser(vm.currentUser);
		vm.showInput = false;
		vm.currentUser = {};
		vm.noticeMsg = "Successfully updated!";
	}

	vm.openAvatarList = function(data){
		if (data.role == 'admin') {
			vm.showAvatars = true;
			vm.currentUser = angular.copy(data);
		}else {
			vm.noticeMsg = 'This user has no rights to edit';
			vm.showAvatars = false;
			vm.currentUser = {};
		}
		$scope.$broadcast('delborder');
	}

	vm.changeAvatar = function(data){
		vm.currentUser.img = data;
		userServices.updateAvatar(vm.currentUser);
		vm.showAvatars = false;
		vm.currentUser = {};
		vm.noticeMsg = "Successfully updated!";
		$scope.$broadcast('delborder');
	}

	vm.saveItem = function(data){
		var bookmark = data;
		bookmark.url = '';
		bkmServices.saveBkm(bookmark);
		vm.noticeMsg = 'Successfully added';
		vm.newBookmark = {};
		$scope.$broadcast('focusout');
	}

	vm.visibleBkb = function(){
		stgServices.setVisibleBkb(vm.showBkm);
	}

	vm.changeFsz = function() {
		stgServices.setFontSize(vm.fsz);
	}

	vm.changePzm = function(){
		stgServices.setPageZoom(vm.pzm);
	}

	vm.print = function(){
		var printWindow = $window.open('#!/', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
		printWindow.addEventListener('load', function(){
	        printWindow.print();
	        printWindow.close();
	    }, true);
	}

	vm.reset = function(){
		stgServices.resetToDefault();
		settings = stgServices.getSettings();
		vm.bg = settings.bg;
		vm.showBkm = settings.showBkm;
		vm.fsz = settings.fsz;
		vm.pzm = settings.pzm;
	}
}]);