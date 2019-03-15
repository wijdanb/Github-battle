import React from 'react'
import Popular from './Popular'
import ReactRouter from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'  
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Results from './Results'


class App extends React.Component{
	render(){
		return (
			<Router>
				<div className ='container'> 
				<Nav /> 
				<Switch>   
					<Route exact path='/'  component ={Home} />
					<Route exact path='/battle' component = {Battle} />
					<Route path ='/popular' component={Popular} />
					<Route path ='/battle/results' component={Results} />
					<Route render ={() => <p> Not found </p>} />
				</Switch>  
			</div>
			</Router>
			//Render a router and the Popular component will only be rendered when the user goes to /popular
			 //basically when user goes to /popular, our Popular component will be rendered

			 //Switch is going to: when this this runs, instead of rendering all the routes that are active, switch will just render one specific route.Can assume that if the '/', '/battle' and '/popular' route dont render then we are at a route that isnt a valid route so we want to show a not found page. That error route wont have a path and because its wrapped in a Switch, it will ONLY be shown if none of those 3 routes are active.
			 //React Router also allows us to give a render prop and the render prop takes in a function and returns some UI. Instead of having to create an ENTIRE component just to have a 'not found' text, we use a render property and pass it a function and it returns a JSX.
		)
	}
}

export default App;