import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import HomeView from './views/homeView'
import DetailView from './views/detailView'
import BrowseView from './views/browseView'

const app = function() {

	const Router = Backbone.Router.extend({
		routes: {
			"home": "handleHome",
			"detail/:cid": "handleDetail",
			"browse": "handleBrowse",
			"*default": "handleDefault"
		},
		handleHome: function(){
			ReactDOM.render(<HomeView />, document.querySelector(".container"))
		},
		handleDetail: function(cid){
			ReactDOM.render(<DetailView cid = {cid}/>, document.querySelector(".container"))
		},
		handleBrowse: function(){
			ReactDOM.render(<BrowseView />, document.querySelector(".container"))
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