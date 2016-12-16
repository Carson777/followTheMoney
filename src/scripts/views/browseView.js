import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './headerView'

const BrowseView = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchLegList()
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
		console.log(this.state)
		return(
			<div>
				<Header />
				<div className='home-body'>
					<ButtonList collection={this.state.stateCodeList}/>
					<HomeDisplay collection ={this.state.currentStateReps}/>
				</div>
			</div>
		)
	}
})
const ButtonList = React.createClass({
	_showDeets: function(eventObj) {
		eventObj.preventDefault()
		ACTIONS.fetchByState(eventObj.target.whichState.value)
	},
	render: function(){
		var col = this.props.collection
		return(
			<form onSubmit={this._showDeets}>
				<select name="whichState" >
					{col.map(stateCode => <option>{stateCode}</option>)}
				</select>
				<button type='submit'>Submit</button>
			</form>
		)
	}

})
const HomeDisplay = React.createClass({
	render: function(){
		var col = this.props.collection
		return(
			<ul>
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

export default BrowseView