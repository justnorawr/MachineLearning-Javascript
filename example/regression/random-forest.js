var KNNApp = angular.module('RFApp', []);

KNNApp.controller('ExampleController', function ($scope) {
	
	$scope.init = function () {

		var features = [
			
		];

		var targets = [
			
		];

		var RFModel = new RandomForest();
		RFModel.train(features, targets);
		var prediction = RFModel.predict();
		console.log(prediction);

	};

});
