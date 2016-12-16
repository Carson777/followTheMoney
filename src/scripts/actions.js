import STORE from './store'
import {LegislatorCollection, geolocationFinder, DetailCollection, LocalSunlightCollection, TotalSunlightCollection} from "./models/models"
import $ from 'jquery'

const ACTIONS = {
	getCoords: function(responseObject){
			var lat = responseObject.coords.latitude
			var long = responseObject.coords.longitude
			console.log('coords fetched')
			ACTIONS.fetchLocalRep(lat,long)
		},
	fetchByState: function(stateCode){
		var currentStateReps = []
		var legislators = STORE._data.totalSunlightCollection
		for( var i = 0; i < legislators.length; i++){
			if(legislators.models[i].get('state') === stateCode){
				currentStateReps.push(legislators.models[i])
			}
		}
		STORE._set({
			'currentStateReps': currentStateReps
		})

	},
	fetchData: function(stateCode){
		console.log('fetching data')
		var l = new LegislatorCollection()
		l.fetch({
			dataType: 'json',
			data: {
				baseURL: 'https://www.opensecrets.org/api',
				id: stateCode,
				apikey: l._key,
				output: 'json',
				method: 'getLegislators'
			}
		}).then(
			function(resp){
				STORE._set({
					legCollection: l.models
				})
			},
			function(err) {
				console.log(err)
			})
	},
	findRepDetails: function(cid){
		var currentDetailRep = []
		var legislators = STORE._data.totalSunlightCollection
		for( var i = 0; i < legislators.length; i++){
			if(legislators.models[i].get('crp_id') === cid){
				currentDetailRep.push(legislators.models[i])
			} 
		}
		STORE._set({
				'currentDetailRep': currentDetailRep
		})
	},
	fetchByState: function(stateCode){
		var currentStateReps = []
		var legislators = STORE._data.totalSunlightCollection
		for( var i = 0; i < legislators.length; i++){
			if(legislators.models[i].get('state') === stateCode){
				currentStateReps.push(legislators.models[i])
			}
		}
		STORE._set({
			'currentStateReps': currentStateReps
		})

	},
	fetchLegList: function(cid){
		var l = new TotalSunlightCollection()
		l.fetch({
			data:{
				apikey:l._key,
				all_legislators: 'true',
				per_page: 'all'
			}
		}).then(function(){
			STORE._set({
				totalSunlightCollection: l
			})
			if(cid){
				ACTIONS.findRepDetails(cid)
			}
		})
	},
	fetchLocalRep: function(lat, long){
		var s = new LocalSunlightCollection()
		s.fetch({
			data: {
				apikey: s._key,
				latitude: lat,
				longitude: long
			}
		}).then(function(){
			STORE._set({
				localSunlightCollection: s
			})
		})
	},
	showDeets: function(cid){
		STORE._set({
			industriesLoading: true
		})
		var d = new DetailCollection()
		d.fetch({
			dataType: 'json',
			data: {
				baseURL: 'https://www.opensecrets.org/api',
				cid: cid,
				apikey: d._key,
				cycle: '2016',
				output: 'json',
				method: 'candIndustry'
			}
		}).then(
			function(resp){
				STORE._set({
					detailCollection: d,
					industriesLoading: false

				})
			},
			function(err) {
				console.log(err)
			})
	}

}
export default ACTIONS