// DOM variables
const issueContainerEl = document.querySelector("#issues-container");
const limitWarningEl = document.querySelector("#limit-warning");

const getRepoIssues = function(repo) {
	// Set the variable for the URL that takes repo as an argument
	const gitHubApiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;
	
	// Fetch the data, use the promise "then" and convert the data into a JSON object
	fetch(gitHubApiUrl).then(function(response) {
		
		// Ensure the request was successful
		if (response.ok) {
			response.json().then(function(data) {
				// Call display issues and show the data
				displayIssues(data);

				// Check if API has paginated issues
				if (response.headers.get("Link")) {
					displayWarning(repo);
				}
			});

		} else {
			alert("There was a problem with the request");
		}
	});
};

const displayIssues = function(issues){
	// Make sure there are open issues, if there isn't alert the user
	if (issues.length === 0) {
		issueContainerEl.textContent = "The repo you requested does not have any open issues.";
		return;
	}

	for (var i = 0; i < issues.length; i++) {
		// create a link element to take users to the issue on github
		var issueEl = document.createElement("a");
		issueEl.classList = "list-item flex-row justify-space-between align-center";
		issueEl.setAttribute("href", issues[i].html_url);
		issueEl.setAttribute("target", "_blank");

		// Create span to hold issue title
		var titleEl = document.createElement("span");
		titleEl.textContent = issues[i].title;

		// Append to container
		issueEl.appendChild(titleEl);

		// create a type element
		var typeEl = document.createElement("span");

		// check if issue is an actual issue or a pull request
		if (issues[i].pull_request) {
			typeEl.textContent = "(Pull Request)";
		} else {
			typeEl.textContent = "(Issue)";
		}

		// Append to container
		issueEl.appendChild(typeEl);

		issueContainerEl.appendChild(issueEl);
	}
};

const displayWarning = function(repo) {
	// add text to warning container
	limitWarningEl.textContent = "To see more than 30 issues, visit ";

	var linkEl = document.createElement("a");
	linkEl.textContent = "See more issues on GitHub.com";
	linkEl.setAttribute("href", `https://github.com/${repo}/issues`);
	linkEl.setAttribute("target", "_blank");

	// Append to warning container
	limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");