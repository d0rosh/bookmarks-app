app.factory('userServices',['$firebaseArray',function($firebaseArray){
	return {
		getUsers: function(){
			return new Promise(function(resolve, rejected){
				var ref = firebase.database().ref('users');
				resolve($firebaseArray(ref))
			});
		},
		saveUser: function(data){
			var ref = firebase.database().ref('users');
			$firebaseArray(ref).$add(data);
		},
		updateUser: function(data){
			var id = data.$id;
			var updUser = {name: data.name,email: data.email}
			firebase.database().ref('users/' + id).update(updUser);
		},
		updateAvatar: function(data){
			var id = data.$id;
			var updUser = {img: data.img}
			firebase.database().ref('users/' + id).update(updUser);
		}
	}
}]);