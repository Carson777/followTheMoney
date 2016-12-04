import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomeView from './views/homeView'


const app = function() {

	const Router = Backbone.Router.extend({
		routes: {
			"home": "handleHome",
			"browse": "handleBrowse",
			"*default": "handleDefault"
		},
		handleHome: function(){
			ReactDOM.render(<HomeView />, document.querySelector(".container"))
		},
		handleDefault: function(){
			ReactDOM.render(<HomeView />, document.querySelector(".container"))
		},
		handleDefault: function(){
			location.hash = "home"
		},
		initialize: function() {
			Backbone.history.start()
		}
	})
	new Router()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..