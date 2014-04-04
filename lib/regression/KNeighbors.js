Regression.KNeighbors = function (neighbors) {

	this.neighbors = neighbors;
	
	this.train = function (X, Y) {
		this.features = X;
		this.targets = Y;
	};

	this.predict = function (x) {
		
		// get distances and sort from new point
		// and sort ascending
		var distances = this.sort(x);

		// we must have more records in our dataset
		// than neighbors, otherwise we will always
		// predict the same result
		if ( this.neighbors > this.features.length ) {
			return false;
		}

		var total = 0;
		for ( var i=0; i<this.neighbors; i++ )
		{
			var featureIndex = distances[i].featureIndex;
			total = total + this.targets[featureIndex];
		}
		return total / this.neighbors;
	};

	this.sort = function (x) {
		var distances = [];
		
		for (feature in this.features) {
			var distance = this.distance(this.features[feature], x);
			distances.push({featureIndex: feature, distance: distance});
		}
		
		return distances.sort(function (a,b) {
			return a.distance - b.distance;
		});
	};

	// @todo update this to allow an infinite number of features
	this.distance = function(item1, item2) {
		var totalDistance = 0;
		for (x in item1) {
			totalDistance = totalDistance + Math.pow(item1[x] - item2[x] , 2);
		}
		return Math.sqrt(totalDistance);
	};

}