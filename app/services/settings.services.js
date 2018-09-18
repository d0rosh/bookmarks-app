app.factory('stgServices',['$localStorage',function($localStorage){
	var settings = {
		bg: true,
		showBkm: true,
		fsz: '19px',
		pzm: '1'
	}
	function init(){
		$localStorage.bg = settings.bg;
		$localStorage.showBkm = settings.showBkm;
		$localStorage.fsz = settings.fsz;
		$localStorage.pzm = settings.pzm;
	}
	init();
	

	return {
		getSettings: function(){
			return { 
				bg: $localStorage.bg,
				showBkm: $localStorage.showBkm,
				fsz: $localStorage.fsz,
				pzm: $localStorage.pzm
			}
		},
		setColor: function(data){
			$localStorage.bg = data;
		},
		setVisibleBkb: function(data){
			$localStorage.showBkm = data;
		},
		setFontSize: function(data){
			$localStorage.fsz = data;
		},
		setPageZoom: function(data){
			$localStorage.pzm = data;
		},
		resetToDefault: function(){
			init();
		}

	}
}]);