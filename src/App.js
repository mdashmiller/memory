import React, { Component } from 'react'

class App extends Component {

	state = {
		clicked: false
	}

	// component methods

	changeColor = () =>
		this.setState({ clicked: true })

	render() {
		return (
			<div
				className={this.state.clicked ? 'animate' : undefined}
				onClick={() => this.changeColor()}
			>
			</div>
		)
	}
}

export default App
