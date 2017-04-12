var myModule = angular.module('erpregistration', []);
myModule.controller('registration', ['$scope', '$http', function($scope, $http) {
	  $scope.headerTemplate = './templates/header.html';
	  $scope.footerTemplate = './templates/footer.html';
	  $scope.loginTemplate= './templates/loginTemplate.html';
	  $scope.registrationTemplate = './templates/registration.html';
	  $scope.leftNavigationTemplate = './templates/leftNavigation.html';
	  $scope.activateUserTemplate = './templates/activateuser.html';
	  $scope.welcomeTemplate = './templates/welcomeTemplate.html';
	  $scope.status = "";
	  
	  $scope.registration	=	function (){
		  var json_data	=	{"first_name" : $scope.first_name, "last_name" : $scope.last_name, "email_id" : $scope.email_id, "activate": 0};
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
	  
	  $scope.activate_user	=	function(){
		 /* if($scope.pass !== $scope.c_pass){
			  $scope.status = "Password does not matched with confirm password";
			  return false;
		  }*/
		  var json_data	=	{"first_name" : $scope.first_name, "last_name" : $scope.last_name, "email_id" : $scope.email_id, "mobile_number" : $scope.mob_no, "password" : "B3c59856Us"+$scope.pass+"Y12ZTlmK09" };
		  $http.post("./../../save_varyfied_user", json_data)
		    .then(function(response) {
		        if(response.status == 200 && response.data == true){
		        	$scope.status	=	"User activation successfuly";
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
	  
	  $scope.Login	=	function(){
			 /* if($scope.pass !== $scope.c_pass){
				  $scope.status = "Password does not matched with confirm password";
				  return false;
			  }*/
			  var json_data	=	{"email_id" : $scope.l_email, "password" : "B3c59856Us"+$scope.l_password+"Y12ZTlmK09"};
			  $http.post("./../../validate_login", json_data)
			    .then(function(response) {
			        if(response.status == 200 && response.data == true){
			        	window.location = "/index";
			        }
			    });
		  }

  
}]);

