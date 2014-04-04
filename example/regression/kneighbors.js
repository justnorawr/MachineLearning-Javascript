var KNNApp = angular.module('KNNApp', []);

KNNApp.controller('ExampleController', function ($scope) {

	// define our data set
	$scope.features = [
		[6.0931], [8.7951], [7.5422], [4.5429], [4.5573], [5.0597], [3.8910], [5.8980], [5.6039], [6.2712], [5.9592], [5.0500], [5.6039], [8.2464], [6.6969], [7.7841], [9.0384]
	];
	$scope.targets = [
		35.1, 44.5, 40.8, 25.9, 29.5, 27.9, 22.9, 29.9, 29.9, 33.9, 31.5, 31.0, 30.9, 36.0, 29.9, 36.9, 41.9, 40.5, 43.9
	];

	$scope.cv_features = [
		[5.0208], [4.9176], [6.987], [7.012], [6.955], [6.990], [7.123], [7.322], [8.3607], [9.1416], [8.1400]
	];
	$scope.cv_targets = [
		25.1, 22.9, 31.1, 31.5, 31.3, 31.2, 31.8, 32.1, 36.9, 38.9, 37.5
	];
	
	$scope.init = function () {

		$scope.neighbors = 5;

		$scope.$watch(function () { return $scope.neighbors; }, function () {
			$scope.retrain();
			$scope.buildGraphs();
		});

		$scope.retrain();
		$scope.buildGraphs();
	};

	$scope.retrain = function () {
		$scope.KNNModel = new Regression.KNeighbors($scope.neighbors);
		$scope.KNNModel.train($scope.features, $scope.targets);
	};

	$scope.buildGraphs = function () {
		$scope.trainingData = [];
		for (var i=0; i<$scope.features.length; i++)
		{
			var prediction = $scope.KNNModel.predict($scope.features[i]);
			$scope.trainingData.push( [$scope.features[i][0], prediction, $scope.targets[i]] );
		}

		$scope.trainingDataTable = [ ['Features', 'Prediction', 'Sell Price'] ].concat($scope.trainingData);
		var data = google.visualization.arrayToDataTable($scope.trainingDataTable);
		var options = {'title':'Training', 'width':'100%', 'height':300};
		var chart = new google.visualization.ScatterChart(document.getElementById('chart_knn'));
		chart.draw(data, options);

		$scope.validationData = [];
		for (var i=0; i<$scope.cv_features.length; i++)
		{
			var prediction = $scope.KNNModel.predict($scope.cv_features[i]);
			$scope.validationData.push( [$scope.cv_features[i][0], prediction, $scope.cv_targets[i]] );
		}

		$scope.validationDataTable = [ ['Features', 'Prediction', 'Sell Price'] ].concat($scope.validationData);
		var data = google.visualization.arrayToDataTable($scope.validationDataTable);
		var options = {'title':'Cross Validation', 'width':'100%', 'height':300};
		var chart = new google.visualization.ScatterChart(document.getElementById('chart_knn_predictions'));
		chart.draw(data, options);
	};

});
