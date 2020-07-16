// var friends = require("../data/friends");

// module.exports = function(app) {

// 	app.get("/api/friends", function(req, res) {
// 		res.json(friends)
// 	});

// 	app.post("/api/friends", function (req, res) {
// 		console.log(req.body);
// 		var user = req.body;
// 		var userScores = user.scores;

// 				var bestMatch = friends[0];
// 				var bestScore = 100;
// 				var compScore = 0;

// 				for (var i in friends) {
// 					for (var j = 0; j <10; j++) {
// 						compScore += Math.abs(parseInt(friends[i].scores[j]) - parseInt(userScores[j]));
// 						console.log(compScore);
// 					}
// 					if ((bestScore > compScore) && (user.name != friends[i].name)) {
// 						bestMatch = friends[i];
// 						bestScore = compScore;
// 					}
// 					compScore = 0;
// 				}
// 		var nameFlag = true;
// 		for (var i = 0; i < friends.length; i++) {
// 			if (user.name == friends[i].name) {
// 				nameFlag = false;
// 			}
// 		}
// 		if (nameFlag) {
// 			friends.push(req.body);
// 		}
// 		res.json(bestMatch);
// 	});

// }

var friends = require("../data/friends");

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	app.post("/api/friends", function(req, res) {
		var totalDifference = 0;
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};
		
		var userData = req.body;
		var userName = userData.name;
		var userScores = userData.scores;

		var b = userScores.map(function(item) {
			return parseInt(item, 10);
		});
		userData = {
			name: req.body.name,
			photo: req.body.photo,
			scores: b
		};

		console.log("Name: " + userName);
		console.log("User score: " + userScores);

		var sum = b.reduce((a, b) => a + b, 0);
		console.log("Sum of user score " + sum);
		console.log("Best match friend difference " + bestMatch.friendDifference);
		console.log("===========================================");

		for (var i = 0; i < friends.length; i++) {
			console.log(friends[i].name);
			totalDifference = 0;
			console.log("Total difference " + totalDifference);
			console.log("Best match friend difference " + bestMatch.friendDifference);

			var bfriendScore = friends[i].scores.reduce ((a,b) => a + b, 0);
			console.log("Total friend score " + bfriendScore);
			totalDifference += Math.abs(sum - bfriendScore);
			console.log("----------------------------------> " + totalDifference);

			if (totalDifference <= bestMatch.friendDifference) {
				bestMatch.name = friends[i].name;
				bestMatch.photo = friends[i].photo;
				bestMatch.friendDifference = friends[i].totalDifference;
			}
			console.log(totalDifference + " total difference.");
		}

		console.log(bestMatch);
		friends.push(userData);
		console.log("New User Added");
		console.log(userData);
		res.json(bestMatch);

	});
};