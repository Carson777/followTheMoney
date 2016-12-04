import STORE from './store'
import {LegislatorCollection, geolocationFinder} from "./models/models"

const ACTIONS = {
	getCoords: function(responseObject){
			var latLong = responseObject.coords.latitude + ',' + responseObject.coords.longitude
			//use STORE._set to update the coords property of _data to the lat/long
			var coords = {
				coords:{
					'latLong':latLong
				}
			}
			STORE._set(coords)
		},
	fetchData: function(){
		var l = new LegislatorCollection()
		l.fetch({
			dataType: 'json',
			data: {
				baseURL: 'https://www.opensecrets.org/api',
				id: l._id,
				apikey: l._key,
				output: 'json',
				method: 'getLegislators'
			}
		}).then(
			function(resp){
				STORE._set({
					legCollection: l
				})
			},
			function(err) {
				console.log(err)
			})
	},
	fetchState: function(){
		var g = new geolocationFinder()
		g.fetch({
			data: {
				key: g._key,
				latlng: STORE._data.coords.latLong
			}
		}).then(function(){
			console.log(g)
			STORE._set({
				state: g,
				stateFetched: 'true'
			})
		})
	}
	// fetchData: function(){
	// 	var l = new LegislatorCollection()
	// 	l.fetch({
	// 		data: {
	// 			apikey: l._key
	// 		}
	// 	}).then(function(){
	// 		STORE._set({
	// 			legCollection: l
	// 		})
	// 	})
	// }
}
export default ACTIONS