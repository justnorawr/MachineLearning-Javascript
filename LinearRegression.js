function LinearRegression (theta, theta1, alpha, iterations) {
	this.initial_theta = [theta, theta1];
	this.alpha = alpha;
	this.iterations = iterations;

	this.train = function (X, Y) {
		this.theta = this.initial_theta;
		this.costHistory = [];
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
		this.theta = theta;
		this.buildTheta(x.length);

		var h = 0;

		for (var k=0; k<x.length; k++)
		{
			h += this.theta[k] * x[k];
		}

		return 1/x.length + ( (h-y) * (h-y) );
	}

	this.buildTheta = function (features) {
		for (var i=2; i<features; i++) {
			this.initial_theta[i] = this.initial_theta[1];
		}
	}

	this.gradientDescent = function (X, Y) {

		this.buildTheta(X.length);

		// compute one step of gradient descent for each iteration
		for (var i=0; i<this.iterations; i++) {

			var temp = [];

			// compute cost of each feature
			// J(j1, j2, j3) = 1/2m( (Theta0 + Theta1*X1 + Theta2*X2) - Y )^2
			for (var j=0; j<X.length; j++)
			{
				var x = X[j];
				var y = Y[j];
				var h = 0;

				for (var k=0; k<x.length; k++)
				{
					h += this.theta[k] * x[k];
				}

				var cost = [];
				for (var k=0; k<x.length; k++) {
					cost[k] = (h-y) * x[k];
					var delta = (1/Y.length) * cost[k];
					temp[k] = this.theta[k] - (this.alpha * delta);
				}

				this.costHistory[j] = {
					cost: cost[1] * x[1],
					theta: temp,
					hypothesis: h
				};
			}

			// update theta values at this step
			this.theta = temp;
		}
	};
};
