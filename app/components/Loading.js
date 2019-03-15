import React from 'react';
import PropTypes from 'prop-types';

var styles = {
	content: {
		textAlign:'center',
		fontSize: '35px'
	}
};

 
 

class Loading extends React.Component{
	
	static propTypes =	{
	text: PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired,
	};

	static defaultProps = {
	text: 'Loading',
	speed: 300
	};	

	state = {
		text: this.props.text //Im not getting passed a props arg so i have to add a this. before props.text
	}


	 
 
	componentDidMount(){ 
//because I use this.props alot, im going to destructure props //it at the top so it looks //better. Im going to get the text and speed
		const {text,speed} = this.props
		const stopper = text +'...';
		
		this.state.text === stopper
		


		this.interval = window.setInterval( () => {
			this.state.text === stopper 
				? this.setState(() => ({text: this.props.text}))
				: this.setState((prevState) => ({text: prevState.text + '.' }))  	
			
	}, speed)  //no longer creating a new context 
}

componentWillUnmount(){ 

	window.clearInterval(this.interval); 

}

 render(){
 	return(
 			<p style={styles.content}> 
 				{this.state.text}
 			</p>
 		)
 	}

}

 

export default Loading;

 

