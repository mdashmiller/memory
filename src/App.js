import React, { Component } from 'react'
import Grid from './components/Grid'
import Card from './components/Card'
import Button from './components/Button'

class App extends Component {

	state = {
		clicked: false
	}

	render() {
		return (
			<div>
				<h1>Do You Remember?</h1>
				<Grid>
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</Grid>
				<Button>
					Reset
				</Button>
			</div>
		)
	}
}

export default App
