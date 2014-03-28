function MultiVarLinearRegression (theta, theta1, alpha, iterations) {
    this.initial_theta = [theta, theta1, theta1];
    this.alpha = alpha;
    this.iterations = iterations;

    this.train = function (X, Y) {
        console.log('Starting Theta', this.initial_theta);
        this.theta = this.initial_theta;
        this.gradientDescent(X, Y);
        console.log('Final Theta', this.theta);
        return true;
    };

    this.predict = function (x1, x2) {
        return this.theta[0] + (this.theta[1] * x1) + (this.theta[2] * x2);
    }

    this.gradientDescent = function (X, Y) {

        // compute one step of gradient descent for each iteration
        for (var i=0; i<this.iterations; i++) {

            var errors = 0;
            var errors2 = 0;
            var errors3 = 0;

            // compute cose of each feature
            // J(j1, j2, j3) = 1/2m( (Theta0 + Theta1*X1 + Theta2*X2) - Y )^2
            for (var j=0; j<Y.length; j++)
            {
                var x = X[j];
                var y = Y[j];

                // H = Theta0 + Theta1*X1 + Theta2*X2
                var h = this.theta[0] + ( this.theta[1] * x[0] ) + ( this.theta[2] * x[1] );

                errors = errors + (h-y);
                errors2 = errors + (h-y)*(x[0]);
                errors3 = errors + (h-y)*(x[1]);
            }

            // compute partial dirivavtive term for feature 1
            var delta = (1/Y.length) * errors;
            // compute gradient descent step
            // theta - alpha * delta
            var temp1 = this.theta[0] - (this.alpha * delta);

            var delta2 = (1/Y.length) * errors2;
            var temp2 = this.theta[1] - (this.alpha * delta2);

            var delta3 = (1/Y.length) * errors3;
            var temp3 = this.theta[1] - (this.alpha * delta3);

            // update theta values at this step
            this.theta[0] = temp1;
            this.theta[1] = temp2;
            this.theta[2] = temp3;
        }
    };
};


var features = [
    [0, 1], [2, 3], [3, 5], [21, 34], [13, 21], [55, 89], [34, 55], [89, 144], [5, 8], [1, 1], [1, 2], [3, 4], [5, 5], [2, 2], [6, 6], [2, 1], [3, 2], [4, 4], [5, 5], [6, 2], [7, 6]

    //, [10,1], [11,2], [12,3], [13,4], [14,5], [15,6], [16,7], [17,8], [18,9], [19,10], [20,11], [21,12], [22,13], [23,14], [24,15], [25,16], [26,17], [27,18], [28,19], [29,20]
    //, [30,21], [31,22], [32,23], [33,24], [34,25], [35,26], [36,27], [37,28], [38,29], [39,30], [40,31], [41,32], [42,33], [43,34], [44,35], [45,36], [46,37], [47,38], [48,39], [49,40], [50,41], [51,42], [52,43], [53,44], [54,45], [55,46], [56,47], [57,48], [58,49], [59,50], [60,51], [61,52], [62,53], [63,54], [64,55], [65,56], [66,57], [67,58], [68,59], [69,60], [70,61], [71,62], [72,63], [73,64], [74,65], [75,66], [76,67], [77,68], [78,69], [79,70], [80,71], [81,72], [82,73], [83,74], [84,75], [85,76], [86,77], [87,78], [88,79], [89,80], [90,81], [91,82], [92,83], [93,84], [94,85], [95,86], [96,87], [97,88], [98,89], [99,90], [100,91], [101,92], [102,93], [103,94], [104,95], [105,96], [106,97], [107,98], [108,99]

];
var targets = [
    1, 5, 8, 55, 34, 144, 89, 233, 13, 2, 3, 7, 10, 4, 12, 3, 5, 8, 10, 8, 13

    //, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49
    //, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121, 123, 125, 127, 129, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151, 153, 155, 157, 159, 161, 163, 165, 167, 169, 171, 173, 175, 177, 179, 181, 183, 185, 187, 189, 191, 193, 195, 197, 199, 201, 203, 205, 207
];

var theta = .01, alpha = .001, iterations = 100;

var LRModel = new MultiVarLinearRegression(0, theta, alpha, iterations);

LRModel.train(features, targets);

// start at 0,1 and predict fibonacci sequence
var first = 0;
var second = 1;

for (var t=0; t<15; t++)
{
    var prediction = LRModel.predict(first, second);

    console.log( 'For Value: ', [first, second], ' Predicted: ', Math.round(prediction), ' Real Answer:', first+second );

    first = Math.round(second);
    second = Math.round(prediction);
}