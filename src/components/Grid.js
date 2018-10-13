import React, { Component } from 'react'
import styled from 'styled-components'
import Card from './Card'
import Button from './Button'
import emojisArr from '../assets/images-arr'

// styled component
const StyledGrid = styled.div`
	margin: 20px auto; 
	width: 300px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 4px;
`

class Grid extends Component {

	state = {
		randomInts: [],
		positionsClicked: [],
		lastImgRevealed: null,
		lastPosRevealed: null,
		posMatches: [],
		moves: 0
	}

	// component methods

	handleClick = (cardPosition, imgNumber) => {
		// routes user interactions to proper channels
		this.flipCard(cardPosition, imgNumber)
		this.checkForMatch(imgNumber, cardPosition)
	}

	flipCard = (cardPosition, imgNumber) => {
		// sets the state of each card that is clicked
		const { positionsClicked, lastPosRevealed } = this.state
		positionsClicked.push(cardPosition)
		// if lastPosRevealed is empty then fill it with
		// the position of the card the user just clicked
		// thus starting a new comparison cycle
		const lastPos = (!lastPosRevealed) ? cardPosition : lastPosRevealed
		this.setState({
			positionsClicked,
			lastImgRevealed: imgNumber,
			lastPosRevealed: lastPos
		})
	}

	checkForMatch = (imgNumber, cardPosition) => {
		const { lastImgRevealed, lastPosRevealed, posMatches } = this.state
		// if this is the first card of the comparison cycle
		// then don't do anything
		if (lastImgRevealed) {
			// if this is the second card of the comparison cycle
			// and its image is the same as the first it's a match!
			if (lastImgRevealed === imgNumber) {
				// the positions of the matching cards are noted
				posMatches.push(lastPosRevealed)
				posMatches.push(cardPosition)
				this.recordMatch(posMatches)
				this.updateMoves()
			} else {
				// if the second card does not match the
				// first then they are flipped back over
				// so the user can try again
				setTimeout(this.flipBack, 2000)
				this.updateMoves()
			}
		} 
	}

	recordMatch = posMatches =>
		// after the user finds a match, the positions
		// of the matching cards are stored in state
		// and a new comparison cycle is started
		this.setState({
			posMatches,
			lastImgRevealed: null,
			lastPosRevealed: null
		})

	updateMoves = () =>
		this.setState((prevState) => {
			const { moves } = prevState
			return {
				moves: moves + 1
			}
		})

	flipBack = () =>
		// after every 2 cards that are revealed, flip
		// back over any cards that don't match
		this.setState({
			positionsClicked: [],
			lastImgRevealed: null,
			lastPosRevealed: null
		})

	setRandomInts = () => {
		// creates an array of random integer duplicate-pairs
		// equal in length to the number of cards and
		// stores the array in state
		let { randomInts } = this.state
		randomInts = []
		// there are 12 cards, so 6 random integers
		// need to be created and pushed in duplicate
		// into the randomInts array
		for (let x = 0; x < 6; x++) {
			const randomInt = this.createUniqueInt(randomInts)
			randomInts.push(randomInt)
			randomInts.push(randomInt)
		}
		const randomizedArr = this.randomizeArray(randomInts)
		this.setState({ randomInts: randomizedArr })
	}	

	createUniqueInt = arr => {
		// calls for creation of a random integer, then
		// compares this integer to the randomInts array, 
		// only adding new ints to the array if they are not
		// already included
		const randomInt = this.getRandomInt(emojisArr.length)
		if (arr.includes(randomInt)) {
			return this.createUniqueInt(arr)
		} else {
			return randomInt
		}
	}

	getRandomInt = max =>
		// creates an almost-random integer
		// equal to or less than the highest index
		// of emojisArr
		Math.floor(Math.random() * Math.floor(max))

	randomizeArray = arr =>
		// shuffles the order of integers in an array
		arr.sort(() => 
			(0.5 - Math.random())
		)

	shuffle = () => {
		// resets state to its intial configuration and
		// calls for the generation of a new
		// array of random ints
		this.setState({
			randomInts: [],
			posMatches: [],
			moves: 0
		})
		this.flipBack()
		this.setRandomInts()
	}
		
	// lifecycle methods

	componentDidMount() {
		this.setRandomInts()
	}
	
	render() {
		const { randomInts, positionsClicked, posMatches, moves } = this.state
		//console.log(`moves: ${this.state.moves}`)
		/*
		console.log(`randomInts: ${randomInts}`)
		console.log(`positionsClicked: ${positionsClicked}`)
		console.log(`posMatches: ${posMatches}`)
		console.log(`lastImgRevealed: ${this.state.lastImgRevealed}`)
		console.log(`lastPosRevealed: ${this.state.lastPosRevealed}`)
		*/
		return (
			<StyledGrid>
				<Card
					className={positionsClicked.includes(1) || posMatches.includes(1) ? 'color-change' : undefined}
					onClick={() => this.handleClick(1, randomInts[0])}
				>
					<img
						src={emojisArr[randomInts[0]]} 
						alt="random emoji"
						className={positionsClicked.includes(1) || posMatches.includes(1) ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={positionsClicked.includes(2) || posMatches.includes(2) ? 'color-change' : undefined}
					onClick={() => this.handleClick(2, randomInts[1])}
				>
					<img
						src={emojisArr[randomInts[1]]} 
						alt="random emoji"
						className={positionsClicked.includes(2) || posMatches.includes(2) ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={positionsClicked.includes(3) || posMatches.includes(3) ? 'color-change' : undefined}
					onClick={() => this.handleClick(3, randomInts[2])}
				>
					<img
						src={emojisArr[randomInts[2]]} 
						alt="random emoji"
						className={positionsClicked.includes(3) || posMatches.includes(3) ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={positionsClicked.includes(4) || posMatches.includes(4) ? 'color-change' : undefined}
					onClick={() => this.handleClick(4, randomInts[3])}
				>
					<img
						src={emojisArr[randomInts[3]]} 
						alt="random emoji"
						className={positionsClicked.includes(4) || posMatches.includes(4) ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={positionsClicked.includes(5) || posMatches.includes(5) ? 'color-change' : undefined}
					onClick={() => this.handleClick(5, randomInts[4])}
				>
					<img
						src={emojisArr[randomInts[4]]} 
						alt="random emoji"
						className={positionsClicked.includes(5) || posMatches.includes(5) ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={positionsClicked.includes(6) || posMatches.includes(6) ? 'color-change' : undefined}
					onClick={() => this.handleClick(6, randomInts[5])}
				>
					<img
						src={emojisArr[randomInts[5]]} 
						alt="random emoji"
						className={positionsClicked.includes(6) || posMatches.includes(6) ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={positionsClicked.includes(7) || posMatches.includes(7) ? 'color-change' : undefined}
					onClick={() => this.handleClick(7, randomInts[6])}
				>
					<img
						src={emojisArr[randomInts[6]]} 
						alt="random emoji"
						className={positionsClicked.includes(7) || posMatches.includes(7) ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={positionsClicked.includes(8) || posMatches.includes(8) ? 'color-change' : undefined}
					onClick={() => this.handleClick(8, randomInts[7])}
				>
					<img
						src={emojisArr[randomInts[7]]} 
						alt="random emoji"
						className={positionsClicked.includes(8) || posMatches.includes(8) ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={positionsClicked.includes(9) || posMatches.includes(9) ? 'color-change' : undefined}
					onClick={() => this.handleClick(9, randomInts[8])}
				>	
					<img
						src={emojisArr[randomInts[8]]} 
						alt="random emoji"
						className={positionsClicked.includes(9) || posMatches.includes(9) ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={positionsClicked.includes(10) || posMatches.includes(10) ? 'color-change' : undefined}
					onClick={() => this.handleClick(10, randomInts[9])}
				>	
					<img
						src={emojisArr[randomInts[9]]} 
						alt="random emoji"
						className={positionsClicked.includes(10) || posMatches.includes(10) ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={positionsClicked.includes(11) || posMatches.includes(11) ? 'color-change' : undefined}
					onClick={() => this.handleClick(11, randomInts[10])}
				>	
					<img
						src={emojisArr[randomInts[10]]} 
						alt="random emoji"
						className={positionsClicked.includes(11) || posMatches.includes(11) ? 'fade-in' : undefined}
					/>
				</Card>
				<Card
					className={positionsClicked.includes(12) || posMatches.includes(12) ? 'color-change' : undefined}
					onClick={() => this.handleClick(12, randomInts[11])}
				>	
					<img
						src={emojisArr[randomInts[11]]} 
						alt="random emoji"
						className={positionsClicked.includes(12) || posMatches.includes(12) ? 'fade-in' : undefined}
					/>
				</Card>
				<div className="button-row counter">
					<h4>MOVES</h4>
					<div id="moves">{moves}</div>
				</div>
				<div className="button-row score">
					<img src={emojisArr[7]} alt="smiley face"/>
					<img src={emojisArr[7]} alt="smiley face"/>
					<img src={emojisArr[7]} alt="smiley face"/>
					<img src={emojisArr[7]} alt="smiley face"/>
					<img src={emojisArr[7]} alt="smiley face"/>
					<img src={emojisArr[7]} alt="smiley face"/>
				</div>
				<Button
					className="button-row"
					onClick={() => this.shuffle()}
				>
					Reset
				</Button>
			</StyledGrid>
		)
	}
}

export default Grid
