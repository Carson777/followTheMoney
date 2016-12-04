import Backbone from 'backbone'
import _ from 'underscore'
import {LegislatorCollection} from "./models/models"

const STORE = _.extend(Backbone.Events,{

	_data: {
		legCollection: new LegislatorCollection(),
		coords: {},
		state:{},
		stateFetched: 'false'
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