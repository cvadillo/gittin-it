// Get the repo information from GitHub
var getUserRepos = function(user) {
	// Format the GitHub api url before making the request
	var gitApiUrl = "https://api.github.com/users/" + user +"/repos";

	// Assign server response to a variable that we can use
	fetch("gitApiUrl").then(function(serverResponse) {
		serverResponse.json().then(function(data) {
			console.log(data);
		});
	});
};

getUserRepos();