import React, { Component } from 'react'
import styled from 'styled-components'
import Card from './Card'
import Button from './Button'

// styled component
const StyledGrid = styled.div`
	margin: 20px auto; 
	width: 244px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 8px;
`

class Grid extends Component {

	state = {
		card1Clicked: false,
		card2Clicked: false,
		card3Clicked: false,
		card4Clicked: false,
		card5Clicked: false,
		card6Clicked: false,
		card7Clicked: false,
		card8Clicked: false,
		card9Clicked: false
	}

	// component methods

	changeColor = number => {
		const key = `card${number}Clicked`
		this.setState({ [key]: true })
	}

	shuffle = () =>
		this.setState({
			card1Clicked: false,
			card2Clicked: false,
			card3Clicked: false,
			card4Clicked: false,
			card5Clicked: false,
			card6Clicked: false,
			card7Clicked: false,
			card8Clicked: false,
			card9Clicked: false
		})

	render() {
		return (
			<StyledGrid>
				<Card
					className={this.state.card1Clicked ? 'animate' : undefined}
					onClick={() => this.changeColor(1)}
				>
				</Card>
				<Card
					className={this.state.card2Clicked ? 'animate' : undefined}
					onClick={() => this.changeColor(2)}
				>
				</Card>
				<Card
					className={this.state.card3Clicked ? 'animate' : undefined}
					onClick={() => this.changeColor(3)}
				>
				</Card>
				<Card
					className={this.state.card4Clicked ? 'animate' : undefined}
					onClick={() => this.changeColor(4)}
				>
				</Card>
				<Card
					className={this.state.card5Clicked ? 'animate' : undefined}
					onClick={() => this.changeColor(5)}
				>
				</Card>
				<Card
					className={this.state.card6Clicked ? 'animate' : undefined}
					onClick={() => this.changeColor(6)}
				>
				</Card>
				<Card
					className={this.state.card7Clicked ? 'animate' : undefined}
					onClick={() => this.changeColor(7)}
				>
				</Card>
				<Card
					className={this.state.card8Clicked ? 'animate' : undefined}
					onClick={() => this.changeColor(8)}
				>
				</Card>
				<Card
					className={this.state.card9Clicked ? 'animate' : undefined}
					onClick={() => this.changeColor(9)}
				>
				</Card>
				<div className="button-row placeholder"></div>
				<Button
					className="button-row"
					onClick={() => this.shuffle()}
				>
					Reset
				</Button>
				<div className="button-row placeholder"></div>
			</StyledGrid>
		)
	}

}

export default Grid
