import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from '../App'
import Grid from '../components/Grid'
import Card from '../components/Card'
import Counter from '../components/Counter'
import ScoreBoard from '../components/ScoreBoard'
import Button from '../components/Button'
import Winner from '../components/Winner'
import SubBanner from '../components/SubBanner'
import emojisArr from '../assets/images-arr'

Enzyme.configure({ adapter: new Adapter() })

describe('<App /> rendering and interaction tests', () => {

	it('renders without crashing', () => {
	  const div = document.createElement('div')
	  ReactDOM.render(<App />, div)
	  ReactDOM.unmountComponentAtNode(div)
	})

	// test('has a valid snapshot', () => {
	// 	const component = renderer.create(
	// 		<App />
	// 	)
	// 	let tree = component.toJSON()
	// 	expect(tree).toMatchSnapshot()
	// })

	it('renders the <Winner /> component when all the matches are found', () => {
		const wrapper = shallow(<App />)
		wrapper.setState({
			posMatches: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		})		
		expect(wrapper.find(Winner).length).toBe(1)
	})

	it('renders 1 <Grid /> component', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find(Grid).length).toBe(1)
	})
	
	it('renders 3 div.button-row', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find('div.button-row').length).toBe(3)
	})

	it('renders 1 div.counter', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find('div.counter').length).toBe(1)
	})

	it('renders 1 <Counter /> component', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find(Counter).length).toBe(1)
	})

	it('renders 1 div.score', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find('div.score').length).toBe(1)
	})

	it('renders 1 <ScoreBoard /> component', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find(ScoreBoard).length).toBe(1)
	})

	it('renders 1 <Button /> component', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find(Button).length).toBe(1)
	})

	it('renders 1 <SubBanner /> component', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find(SubBanner).length).toBe(1)
	})

	it('handles click events', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		jest.spyOn(instance, 'shuffle')
		wrapper.find(Button).simulate('click')
		expect(instance.shuffle).toHaveBeenCalled()
	})

})

describe('directly invoking "handleClick" method from component instance', () => {

	it('calls "flipCard" and "checkForMatch" methods', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		jest.spyOn(instance, 'flipCard')
		instance.handleClick(1, 2)
		expect(instance.flipCard).toHaveBeenCalledWith(1, 2)
		jest.spyOn(instance, 'checkForMatch')
		instance.handleClick(1, 2)
		expect(instance.checkForMatch).toHaveBeenCalledWith(2, 1)
	})

})

describe('directly invoking "flipCard" from component instance', () => {

	it('updates state with the position number and image number of the card that was clicked', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		instance.flipCard(1, 2)
		expect(wrapper.state('positionsClicked')).toEqual([1])
		expect(wrapper.state('lastImgRevealed')).toBe(2)
		expect(wrapper.state('lastPosRevealed')).toBe(1)
	})

	it('overwrites lastPosRevealed if there already is one', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		wrapper.setState({ lastPosRevealed: 3 })
		instance.flipCard(1, 2)
		expect(wrapper.state('lastPosRevealed')).toBe(3)
	})

})

describe('directly invoking "checkForMatch" from component instance', () => {

	it('calls "recordMatch" and "updateMoves" if this is the second card and it matches the first', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		// calls recordMatch()
		wrapper.setState({ lastImgRevealed: 1, lastPosRevealed: 2 })
		jest.spyOn(instance, 'recordMatch')
		instance.checkForMatch(1, 3)
		expect(instance.recordMatch).toHaveBeenCalledWith([2, 3])
		// calls updateMoves()
		wrapper.setState({ lastImgRevealed: 1 })
		jest.spyOn(instance, 'updateMoves')
		instance.checkForMatch(1)
		expect(instance.updateMoves).toHaveBeenCalled()
	})

	it('calls "flipBack" and "updateMoves" if this is the second card but it does not match the first', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		// calls flipBack()
		wrapper.setState({ lastImgRevealed: 1 })
		jest.useFakeTimers()
		jest.spyOn(instance, 'flipBack')
		instance.checkForMatch(2)
		expect(setTimeout).toHaveBeenCalledTimes(1)
		jest.runOnlyPendingTimers()
		expect(instance.flipBack).toHaveBeenCalled()
		// calls updateMoves()
		wrapper.setState({ lastImgRevealed: 1 })
		jest.spyOn(instance, 'updateMoves')
		instance.checkForMatch(2)
		expect(instance.updateMoves).toHaveBeenCalled()
	})

})

describe('directly invoking "recordMatch" from component instance', () => {

	it('adds the position matches to state and starts a new two-card comparison cycle', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		wrapper.setState({
			positionsClicked: [1, 2],
			posMatches: [1, 2],
			lastImgRevealed: 3,
			lastPosRevealed: 2
		})
		instance.recordMatch([1, 2, 3, 4])
		expect(wrapper.state('positionsClicked')).toEqual([])
		expect(wrapper.state('posMatches')).toEqual([1, 2, 3, 4])
		expect(wrapper.state('lastImgRevealed')).toBe(null)
		expect(wrapper.state('lastPosRevealed')).toBe(null)
	})

})

describe('directly invoking "updateMoves" from component instance', () => {

	let wrapper
	let instance

	beforeEach(() => {
		wrapper = shallow(<App />)
		instance = wrapper.instance()
	})

	it('calls "zeroPad"', () => {
		wrapper.setState({ moves: 1 })
		jest.spyOn(instance, 'zeroPad')
		instance.updateMoves()
		expect(instance.zeroPad).toHaveBeenCalledWith(2)
	})

	it('updates state correctly', () => {
		wrapper.setState({ moves: 1, displayMoves: '01' })
		instance.updateMoves()
		expect(wrapper.state('moves')).toBe(2)
		expect(wrapper.state('displayMoves')).toBe('02')
	})

	it('calls "updateBestScore" when all matches are found', () => {
		wrapper.setState({ 
			posMatches: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
			moves: 1
			})
		jest.spyOn(instance, 'updateBestScore')
		instance.updateMoves()
		expect(instance.updateBestScore).toHaveBeenCalledWith(2)
	})

})

describe('directly invoking "zeroPad" from component instance', () => {

	it('adds leading zero when needed and returns a string', () => {
		let test
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		test = instance.zeroPad(0)
		expect(test).toBe('00')
		test = instance.zeroPad(1)
		expect(test).toBe('01')
		test = instance.zeroPad(10)
		expect(test).toBe('10')
	})

})

describe('directly invoking "updateBestScore" from component instance', () => {

	it('calls "newRecord" when there is a new best score', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		wrapper.setState({ bestScore: 2 })
		jest.spyOn(instance, 'newRecord')
		instance.updateBestScore(1)
		expect(instance.newRecord).toHaveBeenCalled()
	})

	it('sets state with new best score', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		wrapper.setState({ bestScore: 2 })
		instance.updateBestScore(1)
		expect(wrapper.state('bestScore')).toBe(1)
	})

})

describe('directly invoking "newRecord" from component instance', () => {

	it('sets state newBest to true', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		wrapper.setState({ newBest: false })
		instance.newRecord()
		expect(wrapper.state('newBest')).toBe(true)
	})

})

describe('directly invoking "flipBack" from component instance', () => {

	it('sets state to prepare the game board for a new comparison cycle', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		wrapper.setState({
			positionsClicked: [1, 2],
			lastImgRevealed: 3,
			lastPosRevealed: 2
		})
		instance.flipBack()
		expect(wrapper.state('positionsClicked')).toEqual([])
		expect(wrapper.state('lastImgRevealed')).toBe(null)
		expect(wrapper.state('lastPosRevealed')).toBe(null)
	})

})

describe('directly invoking "setRandomInts" from component instance', () => {
	
	let wrapper
	let instance

	beforeEach(() => {
		wrapper = shallow(<App />)
		instance = wrapper.instance()
	})

	it('calls "createUniqueInt"', () => {
		jest.spyOn(instance, 'createUniqueInt')
		instance.setRandomInts()
		expect(instance.createUniqueInt).toHaveBeenCalled()
	})

	it('calls "randomizeArray"', () => {
		jest.spyOn(instance, 'randomizeArray')
		instance.setRandomInts()
		expect(instance.randomizeArray).toHaveBeenCalled()
	})

	it('sets randomInts in state', () => {
		// check when state.randomInts is empty
		wrapper.setState({
			randomInts: []
		})
		instance.setRandomInts()
		expect(wrapper.state('randomInts').length).toBe(12)
		// check when state.randomInts contains values
		wrapper.setState({
			randomInts: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]
		})
		instance.setRandomInts()
		expect(wrapper.state('randomInts').length).toBe(12)
	})

})

describe('directly invoking "createUniqueInt" from component instance', () => {

	it('returns random int > emojisArr.length that is not already in intsArr', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		// create an array of all ints from 0 to one less than emojisArr.length
		let intsArr = []
		for (let i = 0; i < emojisArr.length - 1; i++) {
			intsArr.push(i)
		}
		// (emojisArr.length - 1) will now be the only int createUniqueInt can return
		const uniqueInt = instance.createUniqueInt(intsArr)
		expect(uniqueInt).toBe(emojisArr.length - 1)
	})

})

describe('directly invoking "getRandomInt" from component instance', () => {

	it('returns the expected int', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		// getRandomInt can only return an int >= 0 and
		// smaller than what is passed to it as an argument
		const int = instance.getRandomInt(1)
		expect(int).toBe(0)
	})

})

describe('directly invoking "randomizeArray" from component instance', () => {

		it('returns an array with the item order randomized', () => {
			const wrapper = shallow(<App />)
			const instance = wrapper.instance()
			// create an example array of integer pairs
			// and pass it to the function
			const arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]
			const randomizedArr = instance.randomizeArray(arr)
			// check that the integers have been shuffled
			// in the array

			// slice out mini arrays from the randomized array,
			// each containing a sequential pair
			const firstPair = randomizedArr.slice(0, 2)
			const secondPair = randomizedArr.slice(2, 4)
			const thirdPair = randomizedArr.slice(4, 6)
			const fourthPair = randomizedArr.slice(6, 8)
			const fifthPair = randomizedArr.slice(8, 10)
			const sixthPair = randomizedArr.slice(10, 12)
			// then push them into an array so it
			// can easily be looped through
			const comparisonArr = []
			comparisonArr.push(firstPair, secondPair, thirdPair, fourthPair, fifthPair, sixthPair)
			// this function will return as soon as it finds
			// a pair that doesn't match, thus ensuring that
			// shuffling has occured
			const findFirstDifference = arr => {
				for(let i = 0; i < arr.length; i++) {
					if (arr[i][0] != arr[i][1]) {
						return true
					}
				}
			} 
			// call the function and store its result if true
			const randomized = findFirstDifference(comparisonArr)
				? findFirstDifference(comparisonArr) : false

			expect(randomized).toBe(true)
		})

})

describe('directly invoking "shuffle" from component instance', () => {

	let wrapper
	let instance

	beforeEach(() => {
		wrapper = shallow(<App />)
		instance = wrapper.instance()
	})

	it('sets state for a new game', () => {
		wrapper.setState({
			randomInts: [1, 2, 3, 4],
			positionsClicked: [1, 2, 3],
			posMatches: [4, 5, 6],
			moves: 5,
			displayMoves: '05',
			newBest: true
		})
		instance.shuffle()
		expect(wrapper.state('randomInts').length).toBe(12)
		expect(wrapper.state('positionsClicked')).toEqual([])
		expect(wrapper.state('posMatches')).toEqual([])
		expect(wrapper.state('moves')).toBe(0)
		expect(wrapper.state('displayMoves')).toBe('00')
		expect(wrapper.state('newBest')).toBe(false)
	})	

	it('calls "flipBack"', () => {
		jest.spyOn(instance, 'flipBack')
		instance.shuffle()
		expect(instance.flipBack).toHaveBeenCalled()
	})

	it('calls "setRandomInts"', () => {
		jest.spyOn(instance, 'setRandomInts')
		instance.shuffle()
		expect(instance.setRandomInts).toHaveBeenCalled()
	})

})

describe('directly invoking "createGameBoard" from component instance', () => {

	it('returns an array of 12 <Card /> components', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		const gameBoard = instance.createGameBoard()
		expect((gameBoard).length).toBe(12)
		gameBoard.forEach(item => {
			expect(item).toBeInstanceOf(Object)
		})
		gameBoard.forEach(item => {
			expect(item).toHaveProperty('key', expect.any(String))
		})
	})

})

describe('directly invoking "componentDidMount" from component instance', () => {

	it('calls "setRandomInts"', () => {
		const wrapper = mount(<App />)
		const instance = wrapper.instance()
		jest.spyOn(instance, 'setRandomInts')
		instance.componentDidMount()
		expect(instance.setRandomInts).toHaveBeenCalled()
	})

})
