import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'

const HomeView = React.createClass({
	componentWillMount: function() {
		navigator.geolocation.getCurrentPosition(ACTIONS.getCoords)
		
		// ACTIONS.fetchData()
		STORE.on('Update!',()=>{
			this.setState(STORE._getData())
		})
	},
	getInitialState: function() {
		return STORE._getData()
	},
	render: function(){
		return(
			<div className='home-view'>
				<HomeDisplay collection={this.state.postCollection}/>
			</div>
		)
	}
})

const HomeDisplay = React.createClass({
	render: function(){
		// console.log('data: ',STORE._data)
		console.log(STORE._data.state.models)
		if(STORE._data.coords.latLong){
			console.log('we have latLong')
			if(STORE._data.stateFetched === 'false'){
				console.log('attempting to fetch state')
				ACTIONS.fetchState()
			}
		} else {
			console.log("either no coords or state already fetched")
		}
		return(
			<div className='home-display'>
				<p>{this.props.collection}</p>
			</div>
		)
	}
})

export default HomeView