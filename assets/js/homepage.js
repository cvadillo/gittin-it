// DOM Element variable set up
const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");
const repoContainerEl = document.querySelector('#repos-container');
const repoSearchTermEl = document.querySelector('#repo-search-term');

// Get the repo information from GitHub
const getUserRepos = function(user) {
	// Format the GitHub api url before making the request
	var gitApiUrl = `https://api.github.com/users/${user}/repos`;

	// Assign server response to a variable that we can use
	fetch(gitApiUrl).then(function(serverResponse) {
		if (serverResponse.ok) {
			serverResponse.json().then(function(data) {
			// Send the ouputs to the display repos function
			displayRepos(data, user);
			});
		} else {
			alert("The server says. Error: " + serverResponse.status);
		}
	})
	.catch(function(error) {
		// the catch function gets chained at the end of the "then()" method
		alert("Unable to connect to GitHub");
	});
};

// gets the user name from the event handler and parses the response to the fetch request
const formSubmitHandler = function(event) {
	// Prevent the browser from refreshing
	event.preventDefault();

	// Get the user name from the name input and trim the spaces
	var username = nameInputEl.value.trim();

	if(username) {
		getUserRepos(username);
		nameInputEl.value = "";
	} else {
		alert("Enter a GitHub username");
	}
};

const displayRepos = function(repos, searchTerm) {
	// Check if API returned any repos
	if (repos.length === 0) {
		repoContainerEl.textContent = "No repositories found.";
		return;
	}

	console.log(repos);
	console.log(searchTerm);

	// clear out old content
	repoContainerEl.textContent = "";
	repoSearchTermEl.textContent = searchTerm;

	// loop over repos
	for (var i = 0; i < repos.length; i++) {
		// format repo name
		var repoName = repos[i].owner.login + '/' + repos[i].name;

		// create a container for each repo
		var repoEl = document.createElement('div');
		repoEl.classList = 'list-item flex-row justify-space-between align-center';

		// create a span element to hold repository name
		var titleEl = document.createElement('span');
		titleEl.textContent = repoName;

		// append to container
		repoEl.appendChild(titleEl);

		// create a status element
		var statusEl = document.createElement('span');
		statusEl.classList = 'flex-row align-center';

		// check if current repo has issues or not
		if (repos[i].open_issues_count > 0) {
		  statusEl.innerHTML =
		    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
		} else {
		  statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
		}

		// append to container
		repoEl.appendChild(statusEl);

		// append container to the dom
		repoContainerEl.appendChild(repoEl);
	}
};

// Event Handler to get the github user name
userFormEl.addEventListener("submit", formSubmitHandler);