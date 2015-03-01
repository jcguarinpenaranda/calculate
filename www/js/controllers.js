var app = angular.module('StarterApp', ['ngMaterial','ngMdIcons','ngRoute']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    //.accentPalette('orange');
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

app.controller('CalcCtrl', function($scope){
	 $scope.resultString="";

	  $scope.add=function(value){
	  	$scope.resultString += value;
	  }

	  $scope.calculate = function(){
	  	try{
		  	$scope.resultString = eval($scope.resultString);
	  	}catch(e){
	  		$scope.resultString = "Error";
	  	}
	  }

	  $scope.clearAll = function(){
	  	$scope.resultString = "";
	  }

	  $scope.clear = function(){
	  	if($scope.resultString.length){
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