const id = "YOUR_CLIENT_ID"; 
const sec ="YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`; 

async function getProfile(username){

	const response = await fetch(`https://api.github.com/users/${username}${params}`) 
	
	return response.json();
}

async function getRepos(username){
	const response = await fetch (`https://api.github.com/users/${username}/repos${params} &per_page=100`); 
	return response.json();
}
 
function getStarCount(repos) { 
	return repos.reduce((count, {stargazers_count}) => count + stargazers_count, 0) //just using stargazers_count on the repo object and im not using repo anywhere else so that allows me to OBJECT destructure repo in the parameters list and can grab stargazers_count from the repo object.
//.reduce takes accumulator as 1st arg and 2nd arg is initialValue. The , {stargazers_count}) means that its taking the {‘totalusers: blah,stargazers : blah,amount : ’blah’ }and plucking out stargazers as initial value
}

function calculateScore({followers}, repos){ //before using profile.followers but not using profile anywhere else so I can destructure that. It allows us to get rid of the line var followers = profile.followers
return(followers * 3) + getStarCount(repos); //Grab the invocation of getStarCount(repos) and put it in the return statement to make it one line
}

function handleError(error){
	console.warn(error);
	return null;
}
 
async function getUserData(player){
	const [profile, repos] = await Promise.all([   
			getProfile(player), 
			getRepos(player)
			])

	return  {
		profile,
		score : calculateScore(profile,repos)

	}
}

function sortPlayers(players){ 
	return players.sort((a,b) =>  b.score - a.score);
}




//exporting an object which has battle and fetchPopularRepos properties on it. BUT with ES6 exports, I can export the battle function and fetchPopularRepos function:
//I am NOT doin export default functions, instead im doing a named export so before with default exports, I would default import by doing:
//import fetchPopularRepos from '../api'
//BUT NOW with named exports, to import one of the many functions, I would do this instead:
//import { fetchPopularRepos } from '../api'

export async function battle(players){
	const results = await Promise.all(players.map(getUserData))  
   	.catch(handleError);

	return results === null
	 ? results
	 : sortPlayers(results);

}

export async function fetchPopularRepos(language){
	const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
	
	const response = await fetch(encodedURI)
		.catch(handleError);

	const repos = await response.json();
	return repos.items;	 
}

 