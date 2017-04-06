var myModule = angular.module('erpregistration', []);
myModule.controller('registration', ['$scope', '$http', function($scope, $http) {
	  $scope.headerTemplate = './templates/header.html';
	  $scope.footerTemplate = './templates/footer.html';
	  $scope.loginTemplate= './templates/loginTemplate.html';
	  $scope.registrationTemplate = './templates/registration.html';
	  $scope.leftNavigationTemplate = './templates/leftNavigation.html';
	  $scope.activateUserTemplate = './templates/activateuser.html';
	  $scope.status = "";
	  
	  $scope.registration	=	function (){
		  var json_data	=	{"first_name" : $scope.first_name, "last_name" : $scope.last_name, "email_id" : $scope.email_id};
		  $http.post("./../../register_user", json_data)
		    .then(function(response) {
		        if(response.status == 200 && response.data == true){
		        	$scope.status	=	"User registered succssfuly";
		        	$scope.first_name	=	 "";
		        	$scope.last_name	=	 "";
		        	$scope.email_id		=	"";
		        	$scope.resultClass = "success"
		        }
		        else{
		        	$scope.status	=	"User registration failed";
		        	$scope.resultClass = "failure"
		        }
		    });
	  }
  
}]);

