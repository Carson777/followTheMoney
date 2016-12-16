import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'
import Header from './headerView'

const DetailView = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchLegList(this.props.cid)
		ACTIONS.showDeets(this.props.cid)
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
					<LegislatorDisplay collection={this.state.currentDetailRep} />
					<IndustryDisplay collection={this.state.detailCollection} loading={this.state.industriesLoading}/>
				</div>
			</div>
		)
	}
})

const LegislatorDisplay = React.createClass({
	render: function(){
		var col = this.props.collection
		return(
			<ul className='col-xs-4'>
				{col.map(legModel=> <Legislator model={legModel} />)}
			</ul>
		)
	}
})
const Legislator = React.createClass({
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
	render: function() {
		var model = this.props.model
		var fullName = model.get('first_name') + ' ' + model.get('last_name')
		var imageLink = 'https://theunitedstates.io/images/congress/225x275/' + model.get('bioguide_id') + '.jpg'
		return (
			<li>
				<div className="bio">
						<div className='bio-title'>
							<h3>{fullName}</h3>
						</div>
						<img src={imageLink}/>
						<p>{this._getChamber(model.get('chamber'))}</p>
						<p>{this._getParty(model.get('party'))}</p>
						<p>State: {model.get('state')}</p>
					</div>
			</li>
		)
	}
})
const IndustryDisplay = React.createClass({
	render: function(){
		var col = this.props.collection
		var tableVisiblity = this.props.loading? 'hidden' : ''
		return(
			<div className='col-xs4' className="table-view">
				<img className={this.props.loading? '' : 'hidden'} src='images/loading.gif'/>
				<table className={"table table-striped " + tableVisiblity}>
					<caption>Top Contributors by Industry for {col.cand_name}</caption>
					<thead>
						<tr>
							<td>Total</td>
							<td>Industry</td>
						</tr>
					</thead>
					<tbody>
						{col.models.map(legModel=> <Industry model={legModel} />)}
					</tbody>
				</table>
			</div>
		)
	}
})
const Industry = React.createClass({
	prettyNumbers: function(input) {
		var remain = input.length % 3
   		var answer = ''
   		var x = 0
		for(var i = remain; i <= input.length; i+=3){
    		answer += input.substring((0+x), i)
       	 	answer += ','
        	x = i
		}
    	answer = answer.substring(0,answer.length-1)
    	if(answer.length % 4 === 0){
    		return answer.substring(1,answer.length)
    	} else {
    		return answer
    	}
	},
	render: function() {
		var model = this.props.model
		return (
					<tr>
						<td className='total'>
						$ {this.prettyNumbers(model.get('total'))}
						</td>
						<td className='industry'>
						{model.get('industry_name')}
						</td>
					</tr>
		)
	}
})

export default DetailView