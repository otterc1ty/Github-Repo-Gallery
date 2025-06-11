const overview = document.querySelector(".overview") //targets the div of where your profile information will appear
const username = "otterc1ty";

const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data) //calls the function displaying the user information
};

gitUserInfo();

const displayUserInfo = function (data) {
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
}