import React, { Component } from 'react'
import Grid from './components/Grid'
import Card from './components/Card'
import Counter from './components/Counter'
import ScoreBoard from './components/ScoreBoard'
import Button from './components/Button'
import Winner from './components/Winner'
import SubBanner from './components/SubBanner'
import emojisArr from './assets/images-arr'

// track user's best score in browser memory
const cachedScore = localStorage.getItem('best score')
const userScore = (cachedScore) ? cachedScore : null

class App extends Component {

	state = {
		randomInts: [],
		positionsClicked: [],
		lastImgRevealed: null,
		lastPosRevealed: null,
		posMatches: [],
		moves: 0,
		displayMoves: '00',
		bestScore: userScore,
		newBest: false
	}

	// component methods

	handleClick = (cardPosition, imgNumber) => {
		// routes user interactions to proper channels
		this.flipCard(cardPosition, imgNumber)
		this.checkForMatch(imgNumber, cardPosition)
	}

	flipCard = (cardPosition, imgNumber) => {
		// tracks the positions of cards that have
		// been clicked and the last position clicked
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
		posMatches.length === 12 && this.updateBestScore(updatedMoves)		
	}

	zeroPad = num => {
		// works correctly in this application by taking
		// a positive integer and returning a string
		// with a propended zero for single digits
		if (num < 10) {
			return '0' + num
		}
		return num.toString()
	}

	updateBestScore = moves => {
		const { bestScore } = this.state
		// when user achieves a new best score
		// update it in local storage and state
		// and call for a New Record! celebration
		if (!bestScore || moves < bestScore) {
			const newbestScore = moves
			localStorage.setItem('best score', newbestScore)
			this.setState({ bestScore: newbestScore })
			this.newRecord()		
		}
	}

	newRecord = () =>
		// sets state to inform the Winner component
		// to display the New Record! announcement
		this.setState({ newBest: true })

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
		// creates an almost-random positive integer
		// equal to or less than the highest index
		// of emojisArr
		Math.floor(Math.random() * max)

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
			displayMoves: '00',
			newBest: false
		})
		this.flipBack()
		this.setRandomInts()
	}

	createGameBoard = () => {
		// creates an array of 12 game
		// cards, each with a consecutive
		// image from emojisArr
		const {
			randomInts,
			positionsClicked,
			posMatches
		} = this.state
		const gameBoard = []

		for (let i = 0; i < 12; i++) {
			gameBoard.push(
				<Card
					className={
						positionsClicked.includes(i + 1) || posMatches.includes(i + 1)
							? 'color-change disabled' : undefined
					}
					onClick={ () => this.handleClick(i + 1, randomInts[i]) }
					key={i + 1}
				>	
					<img
						src={emojisArr[randomInts[i]]} 
						alt="random emoji"
						className={
							positionsClicked.includes(i + 1) || posMatches.includes(i + 1)
								? 'fade-in' : undefined
						}
					/>
				</Card>
			)	
		}
		return gameBoard
	}
		
	// lifecycle methods

	componentDidMount() {
		this.setRandomInts()
	}

	render() {
		const {
			positionsClicked, 
			posMatches,
			moves, 
			displayMoves,
			bestScore,
			newBest
		} = this.state
		return (
			<div className="main">
				<h1>Do You Remember?</h1>

			{	posMatches.length === 12 &&
					<Winner
						moves={moves}
						newBest={newBest}
						replay={() => this.shuffle()}
					>
					</Winner>
			}

				<Grid className={ positionsClicked.length > 1 ? 'disabled' : undefined }>
					{this.createGameBoard()}
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
					<SubBanner bestScore={bestScore}>
					</SubBanner>
				</Grid>
			</div>
		)
	}
}

export default App
