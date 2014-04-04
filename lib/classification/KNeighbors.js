Classification.KNeighbors = function (neighbors) {

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

		votes = {};
		for ( var i=0; i<this.neighbors; i++ )
		{
			var featureIndex = distances[i].featureIndex;
			var featureClass = this.targets[featureIndex];
			
			if (votes[featureClass]) {
				votes[featureClass] = votes[featureClass] + 1;
			}
			else {
				votes[featureClass] = 1;
			}
		}

		// return class with the majority vote
		return this.majorityclass(votes);
	};

	this.majorityclass = function (votes) {
		var majorityClass = null, majorityClassCount =0;
		
		for (vote in votes) {
			if (votes[vote] > majorityClassCount) {
				majorityClass = vote;
				majorityClassCount = votes[vote];
			}
		}
		
		return majorityClass;
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