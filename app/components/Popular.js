import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

function SelectLanguage({selectedLanguage, onSelect}){ //desturcturing props object
	var languages =['All', 'JavaScript', 'Ruby','Java','CSS','Python'];
	return(
			<ul className ='languages'>
				{languages.map((lang) => (
						<li style={lang === selectedLanguage ? {color:'#d0021b'}:null}  
//	    onClick={props.onSelect.bind(null,lang)} is now this. No need for bind because arrow functions will use the //same //context as its parent. onSelect is basically the function for updateLanguage and it returns an object  
						    onClick={() => onSelect(lang)}
							key ={lang}>
							{lang}
						</li>
				))}		 
			  </ul>
  		)
}

function RepoGrid({ repos }){
	return(
		<ul className ='popular-list'>
			{repos.map(({name, stargazers_count, owner,html_url },index) => ( //having a bracket because Im returning an object and its multiline. Implicit return also. Desturcturing repos to get name,stargazers count, html_url and owner from repos object
				<li key={name} className ='popular-item'>
					<div className ='popular-rank'>#{index + 1}</div>
					<ul className='space-list-items'>
						<li>
							<img 
								className ='avatar'
								src={owner.avatar_url}
								alt = {'Avatar for' + owner.login}
								/>
						</li>
						<li><a href={html_url}>{name}</a></li>
						<li>@{owner.login}</li>
						<li>{stargazers_count}stars</li>
					</ul>
				</li>
		  
		  ))}
		</ul>
	)
}

RepoGrid.propTypes ={
	repos: PropTypes.array.isRequired

}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect:PropTypes.func.isRequired,
}

 


class Popular extends React.Component{
	state = {
		selectedLanguage: 'All',
		repos: null

	}
 
	componentDidMount(){
	 	this.updateLanguage(this.state.selectedLanguage);
	}


	updateLanguage = async (lang) => {  
		this.setState(() => ({ //if I have a function in a function like here, just delete the function and keep //that parenthesis made behinde function e.g : this.setState(function()...  is now this.setState(() => ...
				selectedLanguage:lang,
				repos:null
		}));

		const repos = await fetchPopularRepos(lang);
		this.setState(() => ({repos})) 
	}

	render(){
	const {selectedLanguage,repos} = this.state
		return(
			<div>
				<SelectLanguage selectedLanguage = {selectedLanguage}
								onSelect = {this.updateLanguage}
				 />
				 {!repos
				 	? <Loading  /> 
					: <RepoGrid repos={repos} />}
			</div>
		)
	}
}

export default Popular;


