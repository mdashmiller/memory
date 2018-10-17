import React, { Component } from 'react'
import styled from 'styled-components'
import Card from './Card'
import Counter from './Counter'
import ScoreBoard from './ScoreBoard'
import Button from './Button'
import Winner from './Winner'
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
		moves: 0,
		displayMoves: '00',
		bestScore: null
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
		if (lastImgRevealed !== null) {
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
				setTimeout(this.flipBack, 1500)
				this.updateMoves()
			}
		} 
	}

	recordMatch = posMatches =>
		// after the user finds a match, the positions
		// of the matching cards are stored in state
		// and a new comparison cycle is started	
		this.setState({
			positionsClicked: [],
			posMatches,
			lastImgRevealed: null,
			lastPosRevealed: null
		})
		
	updateMoves = () => {
		// tracks moves made by user
		const {moves, posMatches} = this.state
		const updatedMoves = moves + 1
		const updatedDisplayMoves = this.zeroPad(updatedMoves)
		this.setState({
			moves: updatedMoves,
			displayMoves: updatedDisplayMoves
		})
		posMatches.length === 12 && this.updatebestScore(updatedMoves)		
	}

	zeroPad = num => {
		// works correctly in this application by taking
		// a positive integer and returns a string
		// with a propended zero for single digits
		if (num < 10) {
			return '0' + num
		}
		return num.toString()
	}

	updatebestScore = moves => {
		// when user achieves a new best score
		// update it in state
		const { bestScore } = this.state
		const newbestScore = (!bestScore || moves < bestScore) ? moves : bestScore
		this.setState({ bestScore: newbestScore })
	}

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
		// resets state for a new game and
		// calls for the generation of a new
		// array of random ints
		this.setState({
			randomInts: [],
			positionsClicked: [],
			posMatches: [],
			moves: 0,
			displayMoves: '00'
		})
		this.flipBack()
		this.setRandomInts()
	}
		
	// lifecycle methods

	componentDidMount() {
		this.setRandomInts()
	}

	render() {
		const {
			randomInts, 
			positionsClicked, 
			posMatches,
			moves, 
			displayMoves
		} = this.state
		console.log(`moves: ${moves}`)
		console.log(`position matches: ${posMatches}`)
		console.log(`best score: ${this.state.bestScore}`)
		return (
			<div className="main">	
				{posMatches.length === 12 &&
					<Winner
						moves={moves}
						replay={() => this.shuffle()}
					>
					</Winner>
				}
				<StyledGrid className={positionsClicked.length > 1 ? 'disabled' : undefined}>
					<Card
						className={
							positionsClicked.includes(1) || posMatches.includes(1) 
								? 'color-change disabled' : undefined
						}
						onClick={() => this.handleClick(1, randomInts[0])}
					>
						<img
							src={emojisArr[randomInts[0]]} 
							alt="random emoji"
							className={positionsClicked.includes(1) || posMatches.includes(1) ? 'fade-in' : undefined}
						/>
					</Card>
					<Card
						className={
							positionsClicked.includes(2) || posMatches.includes(2)
								? 'color-change disabled' : undefined
						}
						onClick={() => this.handleClick(2, randomInts[1])}
					>
						<img
							src={emojisArr[randomInts[1]]} 
							alt="random emoji"
							className={positionsClicked.includes(2) || posMatches.includes(2) ? 'fade-in' : undefined}
						/>
					</Card>
					<Card
						className={
							positionsClicked.includes(3) || posMatches.includes(3)
								? 'color-change disabled' : undefined
						}
						onClick={() => this.handleClick(3, randomInts[2])}
					>
						<img
							src={emojisArr[randomInts[2]]} 
							alt="random emoji"
							className={positionsClicked.includes(3) || posMatches.includes(3) ? 'fade-in' : undefined}
						/>
					</Card>
					<Card
						className={
							positionsClicked.includes(4) || posMatches.includes(4)
								? 'color-change disabled' : undefined
						}
						onClick={() => this.handleClick(4, randomInts[3])}
					>
						<img
							src={emojisArr[randomInts[3]]} 
							alt="random emoji"
							className={positionsClicked.includes(4) || posMatches.includes(4) ? 'fade-in' : undefined}
						/>
					</Card>
					<Card
						className={
							positionsClicked.includes(5) || posMatches.includes(5)
								? 'color-change disabled' : undefined
						}
						onClick={() => this.handleClick(5, randomInts[4])}
					>
						<img
							src={emojisArr[randomInts[4]]} 
							alt="random emoji"
							className={positionsClicked.includes(5) || posMatches.includes(5) ? 'fade-in' : undefined}
						/>
					</Card>
					<Card
						className={
							positionsClicked.includes(6) || posMatches.includes(6)
								? 'color-change disabled' : undefined
						}
						onClick={() => this.handleClick(6, randomInts[5])}
					>
						<img
							src={emojisArr[randomInts[5]]} 
							alt="random emoji"
							className={positionsClicked.includes(6) || posMatches.includes(6) ? 'fade-in' : undefined}
						/>
					</Card>
					<Card
						className={
							positionsClicked.includes(7) || posMatches.includes(7)
								? 'color-change disabled' : undefined
						}
						onClick={() => this.handleClick(7, randomInts[6])}
					>
						<img
							src={emojisArr[randomInts[6]]} 
							alt="random emoji"
							className={positionsClicked.includes(7) || posMatches.includes(7) ? 'fade-in' : undefined}
						/>
					</Card>
					<Card
						className={
							positionsClicked.includes(8) || posMatches.includes(8)
								? 'color-change disabled' : undefined
						}
						onClick={() => this.handleClick(8, randomInts[7])}
					>
						<img
							src={emojisArr[randomInts[7]]} 
							alt="random emoji"
							className={positionsClicked.includes(8) || posMatches.includes(8) ? 'fade-in' : undefined}
						/>
					</Card>
					<Card
						className={
							positionsClicked.includes(9) || posMatches.includes(9)
								? 'color-change disabled' : undefined
						}
						onClick={() => this.handleClick(9, randomInts[8])}
					>	
						<img
							src={emojisArr[randomInts[8]]} 
							alt="random emoji"
							className={positionsClicked.includes(9) || posMatches.includes(9) ? 'fade-in' : undefined}
						/>
					</Card>
					<Card
						className={
							positionsClicked.includes(10) || posMatches.includes(10)
								? 'color-change disabled' : undefined
						}
						onClick={() => this.handleClick(10, randomInts[9])}
					>	
						<img
							src={emojisArr[randomInts[9]]} 
							alt="random emoji"
							className={positionsClicked.includes(10) || posMatches.includes(10) ? 'fade-in' : undefined}
						/>
					</Card>
					<Card
						className={
							positionsClicked.includes(11) || posMatches.includes(11)
								? 'color-change disabled' : undefined
						}
						onClick={() => this.handleClick(11, randomInts[10])}
					>	
						<img
							src={emojisArr[randomInts[10]]} 
							alt="random emoji"
							className={positionsClicked.includes(11) || posMatches.includes(11) ? 'fade-in' : undefined}
						/>
					</Card>
					<Card
						className={
							positionsClicked.includes(12) || posMatches.includes(12)
								? 'color-change disabled' : undefined
						}
						onClick={() => this.handleClick(12, randomInts[11])}
					>	
						<img
							src={emojisArr[randomInts[11]]} 
							alt="random emoji"
							className={positionsClicked.includes(12) || posMatches.includes(12) ? 'fade-in' : undefined}
						/>
					</Card>
					<div className="button-row counter">
						<Counter moves={displayMoves}></Counter>
					</div>
					<div className="button-row score">
						<ScoreBoard posMatches={this.state.posMatches}>
						</ScoreBoard>
					</div>
					<div className="button-row">
						<Button
							onClick={() => this.shuffle()}
							className={posMatches.length === 12 ? 'disabled' : undefined}
						>
							Reset
						</Button>
					</div>				
				</StyledGrid>
			</div>
		)
	}
}

export default Grid
