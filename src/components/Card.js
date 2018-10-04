import React, { Component } from 'react'
import styled from 'styled-components'

// styled component
const StyledCard = styled.div`
	height: 100px;
	width: 80px;
	border-radius: 5px;
	background-color: red;
	cursor: pointer;
`

class Card extends Component {

	state = {
		clicked: false
	}

	// component methods

	changeColor = () =>
		this.setState({ clicked: true })

	render() {
		return (
			<StyledCard
				className={this.state.clicked ? 'animate' : undefined}
				onClick={() => this.changeColor()}
			>
			</StyledCard>
		)
	}	
}

export default Card
