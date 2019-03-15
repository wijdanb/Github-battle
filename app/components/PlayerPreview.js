import React from 'react';
import PropTypes from 'prop-types';


//we can compose components together ALSO using props.children because if im going to be changing the contents of a certain section of a component when I invoke the component or use the component, I can use props.children to make it a little more dynamic 
export default function PlayerPreview({avatar,username,children}){
	return(
			<div>
				<div className ='column'>
					<img 
						className ='avatar'
						src = {avatar}
						alt ={'Avatar for '  + username}
						/>
						<h2 className ='username'> @{username} </h2>
				</div>

				{children}
			</div>
			 
		)
}

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired

};

 