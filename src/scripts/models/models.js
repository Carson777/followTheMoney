import Backbone from 'backbone'

export const LegislatorCollection = Backbone.Collection.extend({
	url: '/proxy',
	parse: function(rawApiResponse) {
		var responseObj = JSON.parse(rawApiResponse)
		return responseObj.response.legislator
	},
	_id: 'TX',
	_key: '877c0973851f90fcda5fa17428520b0e'

})
export const geolocationFinder = Backbone.Collection.extend({
	url: 'https://maps.googleapis.com/maps/api/geocode/json?',
	parse: function(rawApiResponse) {
		return rawApiResponse.results
	},
	_key:'AIzaSyCmaFwfpFKtkzruqISFG3jCsdY2SaiObPM'
})