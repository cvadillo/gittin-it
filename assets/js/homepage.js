// Get the repo information from GitHub
var getUserRepos = function() {
	fetch("https://api.github.com/users/cvadillo/repos");
};

getUserRepos();