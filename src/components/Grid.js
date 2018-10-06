import React, { Component } from 'react'
import styled from 'styled-components'
import Card from './Card'
import Button from './Button'
import emojisArr from '../assets/images-arr'

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
		card9Clicked: false,
		img1Clicked: false,
		img2Clicked: false,
		img3Clicked: false,
		img4Clicked: false,
		img5Clicked: false,
		img6Clicked: false,
		img7Clicked: false,
		img8Clicked: false,
		img9Clicked: false,
		randomInts: []
	}

	// component methods

	handleClick = number => {
		// routes interaction with 'reset'
		// button to proper channels
		this.changeColor(number)
		this.fadeIn(number)
	}

	changeColor = number => {
		// sets the state of each card that is clicked
		const key = `card${number}Clicked`
		this.setState({ [key]: true })
	}

	fadeIn = number => {
		// sets the state for the img on each card clicked
		const key = `img${number}Clicked`
		this.setState({ [key]: true })
	}

	setRandomInts = () => {
		// creates an array of random integers
		// equal in length to emojisArr
		// and sets state accordingly
		let { randomInts } = this.state
		randomInts = []
		for (let x = 0; x < emojisArr.length; x++) {
				randomInts.push(this.getRandomInt(emojisArr.length))
		}
		this.setState({ randomInts })
	}

	getRandomInt = max =>
		// creates an almost-random integer
		// equal to or smaller than the length
		// of emojisArr
		Math.floor(Math.random() * Math.floor(max))

	shuffle = () => {
		// resets state to its intial configuration and
		// calls for the generation of a new
		// array of random ints
		this.setState({
			card1Clicked: false,
			card2Clicked: false,
			card3Clicked: false,
			card4Clicked: false,
			card5Clicked: false,
			card6Clicked: false,
			card7Clicked: false,
			card8Clicked: false,
			card9Clicked: false,
			img1Clicked: false,
			img2Clicked: false,
			img3Clicked: false,
			img4Clicked: false,
			img5Clicked: false,
			img6Clicked: false,
			img7Clicked: false,
			img8Clicked: false,
			img9Clicked: false,
			randomInts: []
		})
		this.setRandomInts()
	}
		
	// lifecycle methods

	componentDidMount() {
		this.setRandomInts()
	}
		
	render() {
		console.log(this.state.randomInts)
		//console.log(this.state.randomInts[0])
		return (
			<StyledGrid>
				<Card
					className={this.state.card1Clicked ? 'color-change' : undefined}
					onClick={() => this.handleClick(1)}
				>
					<img
						src={emojisArr[0]} 
						alt="hugging face emoji"
						className={this.state.img1Clicked ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={this.state.card2Clicked ? 'color-change' : undefined}
					onClick={() => this.handleClick(2)}
				>
					<img
						src={emojisArr[1]} 
						alt="hugging face emoji"
						className={this.state.img2Clicked ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={this.state.card3Clicked ? 'color-change' : undefined}
					onClick={() => this.handleClick(3)}
				>
					<img
						src={emojisArr[2]} 
						alt="hugging face emoji"
						className={this.state.img3Clicked ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={this.state.card4Clicked ? 'color-change' : undefined}
					onClick={() => this.handleClick(4)}
				>
					<img
						src={emojisArr[3]} 
						alt="hugging face emoji"
						className={this.state.img4Clicked ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={this.state.card5Clicked ? 'color-change' : undefined}
					onClick={() => this.handleClick(5)}
				>
					<img
						src={emojisArr[4]} 
						alt="hugging face emoji"
						className={this.state.img5Clicked ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={this.state.card6Clicked ? 'color-change' : undefined}
					onClick={() => this.handleClick(6)}
				>
					<img
						src={emojisArr[5]} 
						alt="hugging face emoji"
						className={this.state.img6Clicked ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={this.state.card7Clicked ? 'color-change' : undefined}
					onClick={() => this.handleClick(7)}
				>
					<img
						src={emojisArr[6]} 
						alt="hugging face emoji"
						className={this.state.img7Clicked ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={this.state.card8Clicked ? 'color-change' : undefined}
					onClick={() => this.handleClick(8)}
				>
					<img
						src={emojisArr[7]} 
						alt="hugging face emoji"
						className={this.state.img8Clicked ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={this.state.card9Clicked ? 'color-change' : undefined}
					onClick={() => this.handleClick(9)}
				>	<img
						src={emojisArr[8]} 
						alt="hugging face emoji"
						className={this.state.img9Clicked ? 'fade-in' : undefined}
					/>
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
