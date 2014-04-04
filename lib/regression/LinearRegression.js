Regression.LinearRegression = function (theta, theta1, alpha, iterations) {
	this.initial_theta = [theta, theta1];
	this.alpha = alpha;
	this.iterations = iterations;

	this.train = function (X, Y) {
		this.theta = this.initial_theta;
		this.hypothesis = [];
		this.theta_history = [];
		this.gradientDescent(X, Y);
		return true;
	};

	this.predict = function (x) {
		var prediction = 0;
		for (var j=0; j<x.length; j++)
		{
			prediction += this.theta[j] * x[j];
		}
		return prediction;
	}

	this.computeCost = function (theta, x, y)
	{
		theta = theta;
		for (var i=2; i<x.length; i++) {
			theta[i] = theta[1];
		}

		var h = 0;
		for (var k=0; k<x.length; k++)
		{
			h += theta[k] * x[k];
		}

		return 1/x.length + Math.pow( (h-y), 2 );
	}

	this.buildTheta = function (features) {
		for (var i=2; i<features; i++) {
			this.initial_theta[i] = this.initial_theta[1];
		}
	}

	this.gradientDescent = function (X, Y) {

		this.buildTheta(X.length);

		// compute one step of gradient descent for each iteration
		for (var i=1; i<this.iterations+1; i++) {

			// this will hold theta values for each feature at each step
			var temp = [];
			this.theta_history[i] = [];

			// compute cost of each feature
			for (var j=0; j<X.length; j++)
			{
				var x = X[j];
				var y = Y[j];
				var h = 0;

				// calculate sum of all pedictions
				for (var k=0; k<x.length; k++)
				{
					h += this.theta[k] * Math.pow(x[k], k);
				}

				var cost = [];
				for (var k=0; k<x.length; k++) {
					// compute partial derivitve for this feature / step
					cost[k] = (h-y) * x[k];
					var delta = (1/Y.length) * cost[k];

					// save theta value for this feature
					temp[k] = this.theta[k] - (this.alpha * delta);
				}

				this.hypothesis[j] = h;
				this.theta_history[i] = this.computeCost(this.theta, x, y);
			}

			// update theta values at this step
			this.theta = temp;
		}
	};
};
