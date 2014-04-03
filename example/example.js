var LRApp = angular.module('LRApp', []);

LRApp.controller('ExampleController', function ($scope) {

	// define our data set
	$scope.features = [
		[0, 6.0931], [0, 8.7951], [0, 7.5422], [0, 4.5429], [0, 4.5573], [0, 5.0597], [0, 3.8910], [0, 5.8980], [0, 5.6039], [0, 6.2712], [0, 5.9592], [0, 5.0500], [0, 5.6039], [0, 8.2464], [0, 6.6969], [0, 7.7841], [0, 9.0384]
	];
	$scope.targets = [
		35.1, 44.5, 40.8, 25.9, 29.5, 27.9, 22.9, 29.9, 29.9, 33.9, 31.5, 31.0, 30.9, 36.0, 29.9, 36.9, 41.9, 40.5, 43.9
	];

	$scope.cv_features = [
		[0, 5.0208], [0, 4.9176], [0, 6.987], [0, 7.012], [0, 6.955], [0, 6.990], [0, 7.123], [0, 7.322], [0, 8.3607], [0, 9.1416], [0, 8.1400]
	];
	$scope.cv_targets = [
		25.1, 22.9, 31.1, 31.5, 31.3, 31.2, 31.8, 32.1, 36.9, 38.9, 37.5
	];

	$scope.init = function () {
		$scope.iterations = 5;
		$scope.theta = 0.01;
		$scope.alpha = 0.001;

		$scope.LRModel = new LinearRegression(0, .01, .01, $scope.iterations);
		$scope.LRModel.train($scope.features, $scope.targets);
		$scope.buildGraphs();

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
	};

	$scope.retrain = function () {
		$scope.LRModel = new LinearRegression(0, $scope.theta, $scope.alpha, $scope.iterations);
		$scope.LRModel.train($scope.features, $scope.targets);
	};

	$scope.buildGraphs = function () {

		// buld google chart data array for cost function
		var costDataArray = [['Theta', 'Cost']];
		for (var i=-50; i<50; i+=3)
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
			gradientDescentArray.push( [ i, $scope.LRModel.theta_history[i] ] );
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

		// create google chart for price v hypothesis line graph
		var data = google.visualization.arrayToDataTable(dataArray);
		var options = {'title':'Linear Regression Hypothesis', 'width':'100%', 'height':300};
		var chart = new google.visualization.ScatterChart(document.getElementById('chart_lr_line'));
		chart.draw(data, options);

		$scope.predictionArray  = [['Features', 'Prediction', 'Sell Price']];
		$scope.predictionHistory = [];
		for (var i=0; i<$scope.cv_features.length; i++)
		{
			var prediction = $scope.LRModel.predict($scope.cv_features[i]);
			$scope.predictionArray.push( [$scope.cv_features[i][1], prediction, $scope.cv_targets[i]] );
			$scope.predictionHistory.push( [$scope.cv_features[i][1], prediction, $scope.cv_targets[i]] );
		}

		// create google chart for prediction v true value scatter plot
		var data = google.visualization.arrayToDataTable($scope.predictionArray);
		var options = {'title':'Cross Validation', 'width':'100%', 'height':300};
		var chart = new google.visualization.ScatterChart(document.getElementById('chart_lr_prediction'));
		chart.draw(data, options);
	};

});
