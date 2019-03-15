var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['@babel/polyfill','whatwg-fetch', './app/index.js'], //tell webpack where the entry point or main root file of our application is.
	output: {  //tell webpack which location to output the file to. 
		path: path.resolve(__dirname,'dist'), //when webpack creates the single file for us where its gonna output the code IS at the root of our project(which is gonna be github-battle/dist/index_bundle.js). Basically when we run the wepback we'll see a new folder called dist and inside that folders gonna be an 'index_bundle.js' file with all of the code that webpack generated for us.
		filename: 'index_bundle.js',
		publicPath: '/' //base path for all of our assets
	},

	module: {
		rules: [
			{test: /\.(js)$/, use: 'babel-loader'},  //regular expressions saying to do: any js file or any js module inside of our app, go ahead and run the 'babel-loader' on it, it says you can transform our code in any you want and its what we do in the next step
			{test: /\.css$/, use: ['style-loader', 'css-loader']} // on any single css files, inside of our app go ahead and run the style loader on it and the css loader. Css loader looks for any css imports  e.g url('../background.png), its gonna transform this into the require syntax e.g require(''). Stlye loader will take the css thats required and insert it into the page directly so the styles are active on the page.
		]
	}, 
	devServer: {
		historyApiFallback : true //what this does is whenever our app sees a urll like localhost:8080/popular, instead of requesting assets from the server at /popular, it will just redirect to localhost:8080 and then React Router will see that and then react router will load the route for /popular

	},
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	plugins: [ //going to be an array because we can have more than one  
		new HtmlWebpackPlugin({
			template: 'app/index.html' // all we give it is a template it can use

		})
	]

};