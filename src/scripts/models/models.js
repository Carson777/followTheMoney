import Backbone from 'backbone'

export const LegislatorCollection = Backbone.Collection.extend({
	url: '/proxy',
	parse: function(rawApiResponse) {
		var responseObj = JSON.parse(rawApiResponse)
		return responseObj.response.legislator
	},
	_key: '877c0973851f90fcda5fa17428520b0e'

})

const IndustryModel = Backbone.Model.extend({
	parse: function(rawData) {
		return rawData['@attributes']
	}
})
export const DetailCollection = Backbone.Collection.extend({
	url: '/proxy',
	_key: '877c0973851f90fcda5fa17428520b0e',
	model: IndustryModel,
	parse: function(rawResponse) {
		var responseObj = JSON.parse(rawResponse)
		var coll = this
		coll = Object.assign(this,responseObj.response.industries['@attributes'])
		return responseObj.response.industries.industry
	}
})
export const LocalSunlightCollection = Backbone.Collection.extend({
	url: 'https://congress.api.sunlightfoundation.com/legislators/locate?',
	parse: function(rawApiResponse) {
		return rawApiResponse.results
	},
	_key: '0e85724a8f924c6aba8bd576df364eb7'
})
export const TotalSunlightCollection = Backbone.Collection.extend({
	url: 'https://congress.api.sunlightfoundation.com/legislators/',
	parse: function(rawApiResponse) {
		return rawApiResponse.results
	},
	_key: '0e85724a8f924c6aba8bd576df364eb7'
})