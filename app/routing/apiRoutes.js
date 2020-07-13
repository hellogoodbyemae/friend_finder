var friends = require("../data/friends");

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		res.json(friends)
	});

	app.post("/api/friends", function (req, res) {
		console.log(req.body);
		var user = req.body;
		var userScores = user.scores;

				var bestMatch = friends[0];
				var bestScore = 100;
				var compScore = 0;

				for (var i in friends) {
					for (var j = 0; j <10; j++) {
						compScore += Math.abs(parseInt(friends[i].scores[j]) - parseInt(userScores[j]));
						console.log(compScore);
					}
					if ((bestScore > compScore) && (user.name != friends[i].name)) {
						bestMatch = friends[i];
						bestScore = compScore;
					}
					compScore = 0;
				}
		var nameFlag = true;
		for (var i = 0; i < friends.length; i++) {
			if (user.name == friends[i].name) {
				nameFlag = false;
			}
		}
		if (nameFlag) {
			friends.push(req.body);
		}
		res.json(bestMatch);
	});

}