import React from 'react';
import { NavLink } from 'react-router-dom';

//typically with functional components, instead of exporting at the bottom, ill export the default the function
export default function Nav(){ //main default thing im exporting from this Nav.js file is this functional component 
	 return(
		<ul className ='nav'>
			<li>
				<NavLink exact activeClassName ='active' to='/'> 		
				    Home
				</NavLink>
			</li>

			<li>
				<NavLink activeClassName ='active' to='/battle'>
					Battle
				</NavLink>
			</li>

			<li>
				<NavLink activeClassName ='active' to='/Popular'>
					Popular
				</NavLink>
			</li>
			
		</ul>

	)

}

 