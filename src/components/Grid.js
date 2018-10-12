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
		/*
		card1Clicked: false,
		card2Clicked: false,
		card3Clicked: false,
		card4Clicked: false,
		card5Clicked: false,
		card6Clicked: false,
		card7Clicked: false,
		card8Clicked: false,
		card9Clicked: false,
		card10Clicked: false,
		card11Clicked: false,
		card12Clicked: false,
		img1Clicked: false,
		img2Clicked: false,
		img3Clicked: false,
		img4Clicked: false,
		img5Clicked: false,
		img6Clicked: false,
		img7Clicked: false,
		img8Clicked: false,
		img9Clicked: false,
		img10Clicked: false,
		img11Clicked: false,
		img12Clicked: false,
		*/
		positionsClicked: [],//[1, 3]
		lastImgRevealed: null,//12
		lastPosRevealed: null,//1
		randomInts: [],
		posMatches: []//[]
	}

	// component methods

	handleClick = (cardPosition, imgNumber) => {//3, 12
		// routes interaction with 'reset'
		// button to proper channels
		this.flipCard(cardPosition, imgNumber)
		this.checkForMatch(imgNumber, cardPosition)
		
		//this.fadeIn(cardPosition)
		//this.trackFlippedCards(imgNumber)
		//this.setFlippedCard(imgNumber, cardPosition)
	}

	checkForMatch = (imgNumber, cardPosition) => {//12, 3
		const { lastImgRevealed, lastPosRevealed, posMatches } = this.state//12, 1, []
		if (lastImgRevealed) {
			if (lastImgRevealed === imgNumber) {
				posMatches.push(lastPosRevealed)
				posMatches.push(cardPosition)
				this.recordMatch(posMatches)//[1, 3]
			} else {
				/*
				this.setState({
					lastImgRevealed: null,
					lastPosRevealed: null
				})
				*/
				setTimeout(this.flipBack, 2000)
			}
		} 
	}

	recordMatch = posMatches =>//[1, 3]
		this.setState({
			posMatches,
			lastImgRevealed: null,
			lastPosRevealed: null
		})

	flipCard = (cardPosition, imgNumber) => {//3, 12
		// sets the state of each card that is clicked
		const { positionsClicked } = this.state//[1]
		positionsClicked.push(cardPosition)//[1, 3]
		let lastPos
		if (this.state.lastPosRevealed === null) {
			lastPos = cardPosition
		} else {
			lastPos = this.state.lastPosRevealed
		}
		this.setState({
			positionsClicked,//[1, 3]
			lastImgRevealed: imgNumber,//12
			lastPosRevealed: lastPos//
		})
		/*
		const key = `card${cardPosition}Clicked`
		this.setState({ [key]: true })
		*/
	}
/*
	fadeIn = cardPostion => {
		// sets the state for the img on each card clicked
		const key = `img${cardPostion}Clicked`
		this.setState({ [key]: true })
	}

	setFlippedCard = (imgNumber, cardPosition) => {
		// keeps track of last card user has selected
		this.setState({ flippedCard: imgNumber })
		this.checkCards(imgNumber, cardPosition)
	}
		*/

	
/*
	checkCards = (imgNumber, cardPosition) => {
		// checks to see if the card selected matches
		// the previous card selected
		if (this.state.flippedCard) {
			if (this.state.flippedCard !== imgNumber) {
				setTimeout(this.flipBack, 2250)
			} else {
				const imgMatches = []
				const posMatches = []
				imgMatches.push(imgNumber)
				posMatches.push(cardPosition)
				this.setState({
					flippedCard: null,
					imgMatches,
					posMatches
				})
			}
		}
	}
*/
	flipBack = () =>
		this.setState({
			positionsClicked: [],
			lastImgRevealed: null,
			lastPosRevealed: null
		})

	setRandomInts = () => {
		// creates an array of random integer duplicate-pairs
		// equal in length to the number of cards and
		// sets state accordingly
		let { randomInts } = this.state
		randomInts = []//[8,8]
		for (let x = 0; x < 6; x++) {
				//const randomInt = this.getRandomInt(emojisArr.length)
				//let randomInt = this.getRandomInt(emojisArr.length)
				//this.checkArrayForInt(randomInt, randomInts)
				const randomInt = this.createUniqueInt(randomInts)//
				randomInts.push(randomInt)
				randomInts.push(randomInt)
		}
		this.randomizeArray(randomInts)
		this.setState({ randomInts })
	}

	getRandomInt = max =>
		// creates an almost-random integer
		// equal to or less than the highest index
		// of emojisArr
		Math.floor(Math.random() * Math.floor(max))

	createUniqueInt = arr => {//[8,8]
		const randomInt = this.getRandomInt(emojisArr.length)//8
		if (arr.includes(randomInt)) {
			return this.createUniqueInt(arr)
		} else {
			return randomInt
		}
	}

	randomizeArray = arr => {
		const randomizedArr = arr.sort(
			() => (0.5 - Math.random())
		)
		this.setState({ randomInts: randomizedArr })
	}

	shuffle = () => {
		// resets state to its intial configuration and
		// calls for the generation of a new
		// array of random ints
		this.setState({
			randomInts: []
		})
		this.flipBack()
		this.setRandomInts()
	}
		
	// lifecycle methods

	componentDidMount() {
		this.setRandomInts()
	}
	
	render() {
		const { randomInts, positionsClicked, posMatches } = this.state
		console.log(`randomInts: ${randomInts}`)
		console.log(`positionsClicked: ${this.state.positionsClicked}`)
		console.log(`lastImgRevealed: ${this.state.lastImgRevealed}`)
		console.log(`lastPosRevealed: ${this.state.lastPosRevealed}`)
		console.log(`posMatches: ${this.state.posMatches}`)
		//console.log(`numOfCardsFlipped: ${this.state.numOfCardsFlipped}`)
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
				<div className="button-row placeholder"></div>
				<Button
					className="button-row"
					onClick={() => this.shuffle()}
				>
					Reset
				</Button>
				<div className="button-row placeholder"></div>
				<div className="button-row placeholder"></div>
			</StyledGrid>
		)
	}
}

export default Grid
