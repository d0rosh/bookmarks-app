app.factory('bkmServices',['$firebaseArray',function($firebaseArray){
	return {
		saveBkm: function(data){
			var ref = firebase.database().ref('bookmarks');
			$firebaseArray(ref).$add(data);
		},
		updateBkm: function(data) {
			var id = data.$id;
			var updItem = {title: data.title,url: data.url}
			firebase.database().ref('bookmarks/' + id).update(updItem);
		},
		getBkm: function(){
			return new Promise(function(resolve, rejected){
				var ref = firebase.database().ref('bookmarks');
				resolve($firebaseArray(ref))
			});
		}
	}
}]);