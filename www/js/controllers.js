var app = angular.module('StarterApp', ['ngMaterial', 'ngMdIcons','ngRoute']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('red');
});

app.config(function($routeProvider){
	$routeProvider
        .when('/', {
            templateUrl: "templates/home.html",
            controller: "CalcCtrl"
        })
        .when('/about', {
            templateUrl: "templates/about.html"
        })
        .otherwise({
        	redirectTo:'/'
        })
});

app.directive('calcNav', function() {
        return{
            restrict: 'E',
            templateUrl: "templates/navbar.html"
        };
    });

app.controller('CalcCtrl', function($scope, $timeout){
	 $scope.resultString="";
	 $scope.operation="";

	 $scope.userHistory = [];

	  $scope.add=function(value){
	  	if(true){ //$scope.resultString.length<15
		  	$scope.resultString += value;
		  	$scope.operation ="";
	  	}
	  }

	  $scope.add2 = function(str){
	  	var st="";

	  	if(!$scope.resultString.length){
	  		if(str=="(" || str==")"){
	  			$scope.resultString+=str;
	  		}else{
		  		$scope.resultString+=str+"(";
	  		}
	  		return;
	  	}

  		var num = $scope.resultString.charAt($scope.resultString.length-1);
	  	try{
	  		if(typeof eval(num+1) == "number"){
		  		if(str == ")"){
		  			$scope.resultString+=str;
		  		}else if(str=="("){
		  			$scope.resultString+="*"+str;
		  		}else{
		  			$scope.resultString+="*"+str+"(";
		  		}
	  		}
	  	}catch(e){
	  		//so, it was not a number
	  		if(num == ")"){
	  			if(str == ")"){
		  			$scope.resultString+=str;//()
	  			}else{
			  		$scope.resultString+="*"+str+"("; //*cos(
	  			}
	  		}else{
	  			if(num == "("){
		  			if(str=="(" || str==")"){
			  			$scope.resultString+=str;//(( o ()
		  			}else{
			  			$scope.resultString+=str+"(";//(cos(
		  			}
		  		}else{
		  			if(str=="(" || str==")"){
			  			$scope.resultString+=str;//+ - / *   Ex: 1/(1-2)
		  			}else{
			  			$scope.resultString+=str+"(";//+ - / *   Ex: 1/(1-2)
		  			}
		  		}
	  		}
	  	}
	  }

	  $scope.resumeCalculation = function(){
	  	if($scope.operation){
	  		var a = $scope.operation.slice(0,$scope.operation.length-1);
	  		$scope.resultString = a;
		  	$scope.operation = "";

	  	}
	  }

	  function cos(value){
	  	return Math.cos(value)
	  }

	  function sin(value){
	  	return Math.sin(value)
	  }

	  function cot(value){
	  	return 1/Math.tan(value)
	  }

	  function tan(value){
	  	return Math.tan(value)
	  }

	  function sqrt(value){
	  	return Math.sqrt(value)
	  }

	  $scope.calculate = function(){
	  	try{
	  		$scope.operation = $scope.resultString+"=";
		  	$scope.userHistory.push($scope.resultString);
		  	$scope.resultString = eval($scope.resultString) + "";
	  	}catch(e){
	  		$scope.resultString = "Error";
	  	}
	  }

	  $scope.longPressPromise;

	  $scope.longPressStart = function(){
	  	$scope.longPressPromise = $timeout(function(){
	  		$scope.clearAll();
	  	}, 400)
	  }

	  $scope.longPressEnd = function(){
	  	if($scope.longPressPromise){
	  		$timeout.cancel($scope.longPressPromise);
	  	}
	  }

	  $scope.clearAll = function(){
	  	$scope.resultString = "";
	  	$scope.operation="";
	  }

	  $scope.clear = function(){
	  	if($scope.resultString == "Error"){
	  		$scope.clearAll();
	  	}
	  	else if($scope.resultString.length){
		  	$scope.resultString = $scope.resultString.slice(0,$scope.resultString.length-1);
	  	}
	  }
})

app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.openNavbar = function(){
		$mdSidenav('mainNavbar').open();
	} 

	$scope.toggleNavbar = function(){
		$mdSidenav('mainNavbar').toggle();
	} 
}]);