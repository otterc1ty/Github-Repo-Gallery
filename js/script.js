const overview = document.querySelector(".overview"); //targets the div of where your profile information will appear
const username = "otterc1ty";
const repoList = document.querySelector(".repo-list"); //targets the repo unordered list 
const repos = document.querySelector(".repos"); //selects class of 'repos' where all repo info appears
const repoData = document.querySelector(".repo-data")

const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data) //calls the function displaying the user information
};

gitUserInfo();

const displayUserInfo = function (data) { //function for displaying the data of the repository gallery owner on public profile
    const div = document.createElement("div"); //creating a new div
    div.classList.add("user-info"); 
    div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;
    overview.append(div)
    gitRepos(); //fetches repos under function that displays user data
    
};

const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`) 
    //the 'sort=updated' arranges the repos listed on the site from most recently updated to last updated
    //the '&' is put to add another parameter to the list fetch
    //the 'per_page=100' is added to show up to 100 repos per page at a time
    const repoData = await fetchRepos.json();
    displayRepos(repoData);


};

//console.log(gitRepos);

const displayRepos = function (repos) {
    for (const repo of repos) { //looping and creating a list item for each repo. Adding a class of "repo" and an h3 header for each repo name
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
}

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) { //checking that event target matches the <h3> element
        const repoName = e.target.innerText;
    
    getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`); //grabs info about any specific repository
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url); //getting specific repo information from language_url, located in console
    const languageData = await fetchLanguages.json();

//Make a list of languages
const languages = [];
for (const language in languageData) {
    languages.push(language);
}

displayRepoInfo(repoInfo, languages); //calling this function to display the repo info, passing it the repoInfo that has the JSON data, and shows the array of languages
};

const displayRepoInfo = function (repoInfo, languages) { //this function displays specific repo info
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    const div = document.createElement("div"); //creating a new div element that will show selected repo's name, desc, default branch and link to code on GH
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(div);
}  

//^^We are using repoInfo in the {} brackets because this is the function using JSON data to grab relevant properties to display on the page