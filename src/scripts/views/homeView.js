import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './headerView'

const HomeView = React.createClass({
	componentWillMount: function() {
		navigator.geolocation.getCurrentPosition(ACTIONS.getCoords)
		STORE.on('Update!',()=>{
			this.setState(STORE._getData())
		})
	},
	componentWillUnmount: function(){
		STORE.off('Update!')
	},
	getInitialState: function() {
		return STORE._getData()
	},
	render: function(){
		return(
			<div className='home-view'>
				<Header />
				<div className='home-body'>
					<h3 className= 'home-title'>Here are your district's Representative and Senators</h3>
					<HomeDisplay collection={this.state.localSunlightCollection}/>
				</div>
			</div>
		)
	}
})

const HomeDisplay = React.createClass({
	render: function(){
		console.log('data: ',STORE._data)
		var col = this.props.collection
		return(
			<ul className='rep-list'>
				{col.map(legModel=> <Detail model={legModel} />)}
			</ul>
		)
	}
})
const Detail = React.createClass({
	_getChamber: function(chamber) {
		if(chamber === 'senate'){
			return 'Senator'
		} else {
			return 'Representative'
		}
	},
	_getParty: function(party) {
		if(party === 'R'){
			return 'Republican'
		} else if(party === 'D'){
			return 'Democrat'
		} else {
			return 'Other'
		}
	},
	_showDeets: function() {
		var cid = this.props.model.get('crp_id')
		location.hash = 'detail/' + cid
	},
	render: function() {
		var model = this.props.model
		var fullName = model.get('first_name') + ' ' + model.get('last_name')
		var imageLink = 'https://theunitedstates.io/images/congress/225x275/' + model.get('bioguide_id') + '.jpg'
		return (
			<li className='col-xs-4'>
					<div className="bio">
						<div className='bio-title'>
							<h3>{fullName}</h3>
						</div>
						<img src={imageLink}/>
						<p>{this._getChamber(model.get('chamber'))}</p>
						<p>{this._getParty(model.get('party'))}</p>
						<p>State: {model.get('state')}</p>
						<button className='btn' onClick={this._showDeets}>Follow the Money!</button>
					</div>
			</li>
		)
	}
})

export default HomeView