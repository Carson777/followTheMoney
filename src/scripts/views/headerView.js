import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'

const Header = React.createClass({
	render: function(){
		// add a loading gif to the header
		// add a property on store called "loading", which defaults to true
		// that "loading" property should determine whether the gif is displayed.
		//		it needs to be set and unset at the proper moments

		return(
			<div className='header'>
				<div className='header-top'>
					<h1 className='header-title'>Follow the Money</h1>
				</div>
				<div className='header-menu'>
						<nav>
							<a className='link' href="#home">Home State</a>
							<a className='link2' href="#browse">Browse All States</a>
						</nav>
					</div>
			</div>
		)
	}
})







export default Header