var LRApp = angular.module('LRApp', []);

LRApp.controller('ExampleController', function ($scope) {
	
	// define our data set
	$scope.features = [
		[5.5,2.3,4.0,1.3], [6.5,2.8,4.6,1.5], [5.7,2.8,4.5,1.3], [6.3,3.3,4.7,1.6], [4.9,2.4,3.3,1.0], [6.6,2.9,4.6,1.3], [5.2,2.7,3.9,1.4], [5.0,2.0,3.5,1.0], [5.9,3.0,4.2,1.5], [6.0,2.2,4.0,1.0], [6.1,2.9,4.7,1.4], [5.6,2.9,3.6,1.3], [6.7,3.1,4.4,1.4], [5.6,3.0,4.5,1.5], [5.8,2.7,4.1,1.0], [6.2,2.2,4.5,1.5], [5.6,2.5,3.9,1.1], [5.9,3.2,4.8,1.8], [6.1,2.8,4.0,1.3], [6.3,2.5,4.9,1.5], [6.1,2.8,4.7,1.2], [6.4,2.9,4.3,1.3], [6.6,3.0,4.4,1.4], [6.8,2.8,4.8,1.4], [6.7,3.0,5.0,1.7], [6.0,2.9,4.5,1.5], [5.7,2.6,3.5,1.0], [5.5,2.4,3.8,1.1], [5.5,2.4,3.7,1.0], [5.8,2.7,3.9,1.2], [6.0,2.7,5.1,1.6], [5.4,3.0,4.5,1.5], [6.0,3.4,4.5,1.6], [6.7,3.1,4.7,1.5], [6.3,2.3,4.4,1.3], [5.6,3.0,4.1,1.3], [5.5,2.5,4.0,1.3], [5.5,2.6,4.4,1.2], [6.1,3.0,4.6,1.4], [5.8,2.6,4.0,1.2], [5.0,2.3,3.3,1.0], [5.6,2.7,4.2,1.3], [5.7,3.0,4.2,1.2], [5.7,2.9,4.2,1.3], [6.2,2.9,4.3,1.3], [5.1,2.5,3.0,1.1], [5.7,2.8,4.1,1.3], [6.3,3.3,6.0,2.5], [5.8,2.7,5.1,1.9], [7.1,3.0,5.9,2.1], [6.3,2.9,5.6,1.8], [6.5,3.0,5.8,2.2], [7.6,3.0,6.6,2.1], [4.9,2.5,4.5,1.7], [7.3,2.9,6.3,1.8], [6.7,2.5,5.8,1.8], [7.2,3.6,6.1,2.5], [6.5,3.2,5.1,2.0], [6.4,2.7,5.3,1.9], [6.8,3.0,5.5,2.1], [5.7,2.5,5.0,2.0], [5.8,2.8,5.1,2.4], [6.4,3.2,5.3,2.3], [6.5,3.0,5.5,1.8], [7.7,3.8,6.7,2.2], [7.7,2.6,6.9,2.3], [6.0,2.2,5.0,1.5], [6.9,3.2,5.7,2.3], [5.6,2.8,4.9,2.0], [7.7,2.8,6.7,2.0], [6.3,2.7,4.9,1.8], [6.7,3.3,5.7,2.1], [7.2,3.2,6.0,1.8], [6.2,2.8,4.8,1.8], [6.1,3.0,4.9,1.8], [6.4,2.8,5.6,2.1], [7.2,3.0,5.8,1.6], [7.4,2.8,6.1,1.9], [7.9,3.8,6.4,2.0], [6.4,2.8,5.6,2.2], [6.3,2.8,5.1,1.5], [6.1,2.6,5.6,1.4], [7.7,3.0,6.1,2.3], [6.3,3.4,5.6,2.4], [6.4,3.1,5.5,1.8], [6.0,3.0,4.8,1.8], [6.9,3.1,5.4,2.1], [6.7,3.1,5.6,2.4], [6.9,3.1,5.1,2.3], [5.8,2.7,5.1,1.9]
	];
	$scope.targets = [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];

	$scope.cv_features = [
		[7.0,3.2,4.7,1.4], [6.4,3.2,4.5,1.5], [6.9,3.1,4.9,1.5], [6.8,3.2,5.9,2.3], [6.7,3.3,5.7,2.5], [6.7,3.0,5.2,2.3]
	];
	$scope.cv_targets = [
		1, 1, 1, 0, 0, 0
	];

	$scope.init = function () {

		$scope.iterations = 10;
		$scope.theta = 0.1;
		$scope.alpha = 0.1;
		$scope.cost_start = -50;
		$scope.cost_iterations = 100;

		$scope.$watch(function () { return $scope.iterations; }, function () {
			$scope.retrain();
			$scope.buildGraphs();
		});

		$scope.$watch(function () { return $scope.alpha; }, function () {
			$scope.retrain();
			$scope.buildGraphs();
		});

		$scope.$watch(function () { return $scope.theta; }, function () {
			$scope.retrain();
			$scope.buildGraphs();
		});

		$scope.$watch(function () { return $scope.cost_start; }, function () {
			$scope.retrain();
			$scope.buildGraphs();
		});

		$scope.$watch(function () { return $scope.cost_iterations; }, function () {
			$scope.retrain();
			$scope.buildGraphs();
		});

		$scope.retrain();
		$scope.buildGraphs();
	};

	$scope.retrain = function () {
		$scope.LRModel = new Classification.LogisticRegression(0, $scope.theta, $scope.alpha, $scope.iterations);
		$scope.LRModel.train($scope.features, $scope.targets);
	};

	$scope.buildGraphs = function () {
		// buld google chart data array for cost function
		var costDataArray = [['Theta', 'Cost']];
		for (var i=$scope.cost_start; i<$scope.cost_start+$scope.cost_iterations; i++)
		{
			costDataArray.push( [i, $scope.LRModel.computeCost([0, i], $scope.features[5], $scope.targets[5])] );
		}

		// create google chart for cost function scatter plot
		var data = google.visualization.arrayToDataTable(costDataArray);
		var options = {curveType: "function", title:'Cost Function', width:'100%', height:300};
		var chart = new google.visualization.ScatterChart(document.getElementById('chart_cost'));
		chart.draw(data, options);

		// buld google chart data array for cost function
		var gradientDescentArray = [['Iterations', 'Cost At Iteration']];
		var iterations = $scope.iterations;
		for (var i=1; i<iterations+1; i++) {
			gradientDescentArray.push( [ i, $scope.LRModel.theta_history[i] ]);
		}

		// create google chart for cost function scatter plot
		var data = google.visualization.arrayToDataTable(gradientDescentArray);
		var options = {curveType: "function", title:'Gradient Descent', width:'100%', height:300};
		var chart = new google.visualization.ScatterChart(document.getElementById('chart_gd'));
		chart.draw(data, options);

		// create google chart data array for hypothesis function
		var dataArray = [['Features', 'Sell Prices', 'Hypothesis']];
		for (var i=0; i<$scope.features.length; i++)
		{
			x = $scope.features[i][1] + 0;
			y = $scope.targets[i] + 0;
			hypothesis = $scope.LRModel.hypothesis[i] + 0;
			dataArray.push( [x, y, hypothesis] );
		}

		$scope.trainingData = [];
		for (var i=0; i<$scope.features.length; i++)
		{
			var prediction = $scope.LRModel.predict($scope.features[i]);
			$scope.trainingData.push( [$scope.features[i][0], $scope.features[i][1], $scope.features[i][2], $scope.features[i][3], prediction, $scope.targets[i]] );
		}

		$scope.validationData = [];
		for (var i=0; i<$scope.cv_features.length; i++)
		{
			var prediction = $scope.LRModel.predict($scope.cv_features[i]);
			$scope.validationData.push( [$scope.cv_features[i][0], $scope.cv_features[i][1], $scope.cv_features[i][2], $scope.cv_features[i][3], prediction, $scope.cv_targets[i]] );
		}
	};

});
