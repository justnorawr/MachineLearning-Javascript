
function LinearRegression (theta, theta1, alpha, iterations) {
    this.initial_theta = [theta, theta1];
    this.alpha = alpha;
    this.iterations = iterations;

    this.train = function (x, y) {
        console.log('Starting Theta', this.initial_theta);
        this.theta = this.initial_theta;
        this.gradientDescent(x, y);
        console.log('Final Theta', this.theta);
        return true;
    };

    this.predict = function (x) {
        return this.theta[0] + (this.theta[1] * x);
    }

    this.gradientDescent = function (X, Y) {

        for (var i=0; i<this.iterations; i++) {

            var errors = 0;
            var errors2 = 0;
            for (var j=0; j<Y.length; j++)
            {
                var x = X[j];
                var y = Y[j];

                var h = this.theta[0] + ( this.theta[1] * x );
                errors = errors + (h-y);
                errors2 = errors + (h-y)*x;
            }

            var delta = (1/Y.length) * errors;
            var temp1 = this.theta[0] - (this.alpha * delta);

            var delta2 = (1/Y.length) * errors2;
            var temp2 = this.theta[1] - (this.alpha * delta2);

            this.theta[0] = temp1;
            this.theta[1] = temp2;

            // console.log(this.theta);
            // console.log(this.theta[0] + (this.theta[1] * 15));
        }
    };
};


features = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
targets = [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
theta = .1, alpha = .1, iterations = 1000;

LRModel = new LinearRegression(0, theta, alpha, iterations);
LRModel.train(features, targets);

prediction = LRModel.predict(44);
console.log( 'For Value: ', 44, ' Predicted: ', prediction );
prediction = LRModel.predict(34);
console.log( 'For Value: ', 34, ' Predicted: ', prediction );
prediction = LRModel.predict(24);
console.log( 'For Value: ', 24, ' Predicted: ', prediction );

for (var t=1; t<10; t++)
{
    test = t * Math.random();
    prediction = LRModel.predict(test);

    console.log( 'For Value: ', test, ' Predicted: ', prediction );
}
