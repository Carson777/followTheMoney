import Backbone from 'backbone'
import _ from 'underscore'
import {LegislatorCollection, DetailCollection, LocalSunlightCollection, TotalSunlightCollection} from "./models/models"

const STORE = _.extend(Backbone.Events,{

	_data: {
		legCollection: new LegislatorCollection(),
		localSunlightCollection: new LocalSunlightCollection(),
		totalSunlightCollection: new TotalSunlightCollection(),
		stateCode: '',
		currentStateReps: [],
		currentDetailRep: [],
		detailCollection: new DetailCollection(),
		stateCodeList: ["AK","AL","AR","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"],
		industriesLoading: true

	},
	_emitChange: function() {
		console.log('RELOADING')
		this.trigger('Update!')
	},

	_get: function(key) {
		return this._data[key]
	},

	_getData: function() {
		return this._data
	},

	_set: function(changeObj) {
		this._data = _.extend(this._data, changeObj)
		this._emitChange()
	}

})

export default STORE