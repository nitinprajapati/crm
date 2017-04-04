var myModule = angular.module('erpregistration', []);
myModule.controller('registration', ['$scope', function($scope) {
	  $scope.headerTemplate = './templates/header.html';
	  $scope.footerTemplate = './templates/footer.html';
	  $scope.loginTemplate= './templates/loginTemplate.html';
	  $scope.registrationTemplate = './templates/registration.html';
	  $scope.leftNavigationTemplate = './templates/leftNavigation.html';
}]);

