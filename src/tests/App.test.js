import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chai, { expect, assert } from 'chai'
import { spy } from 'sinon'

import App from '../App'
import Grid from '../components/Grid'
import Card from '../components/Card'
import Counter from '../components/Counter'
import ScoreBoard from '../components/ScoreBoard'
import Button from '../components/Button'
import Winner from '../components/Winner'
import SubBanner from '../components/SubBanner'

Enzyme.configure({ adapter: new Adapter() })

global.jestExpect = global.expect
global.expect = chai.expect

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
	// 	jestExpect(tree).toMatchSnapshot()
	// })

	it('renders the <Winner /> component when all the matches are found', () => {
		const wrapper = shallow(<App />)
		wrapper.setState({
			posMatches: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		})		
		expect(wrapper.find(Winner)).to.have.lengthOf(1)
	})

	it('renders 1 <Grid /> component', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find(Grid)).to.have.lengthOf(1)
	})
	
	it('renders 3 div.button-row', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find('div.button-row')).to.have.lengthOf(3)
	})

	it('renders 1 div.counter', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find('div.counter')).to.have.lengthOf(1)
	})

	it('renders 1 <Counter /> component', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find(Counter)).to.have.lengthOf(1)
	})

	it('renders 1 div.score', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find('div.score')).to.have.lengthOf(1)
	})

	it('renders 1 <ScoreBoard /> component', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find(ScoreBoard)).to.have.lengthOf(1)
	})

	it('renders 1 <Button /> component', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find(Button)).to.have.lengthOf(1)
	})

	it('renders 1 <SubBanner /> component', () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find(SubBanner)).to.have.lengthOf(1)
	})

	it('handles click events', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		const reset = spy(instance, 'shuffle')
		wrapper.find(Button).simulate('click')
		expect(reset).to.have.property('callCount', 1)
	})

})

describe('directly invoking "handleClick" method from component instance', () => {

	it('calls "flipCard" and "checkForMatch" methods', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		jest.spyOn(instance, 'flipCard')
		instance.handleClick(1, 2)
		jestExpect(instance.flipCard).toHaveBeenCalledWith(1, 2)
		jest.spyOn(instance, 'checkForMatch')
		instance.handleClick(1, 2)
		jestExpect(instance.checkForMatch).toHaveBeenCalledWith(2, 1)
	})

})

describe('directly invoking "flipCard" from component instance', () => {

	it('updates state with the position number and image number of the card that was clicked', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		instance.flipCard(1, 2)
		jestExpect(wrapper.state('positionsClicked')).toEqual([1])
		jestExpect(wrapper.state('lastImgRevealed')).toBe(2)
		jestExpect(wrapper.state('lastPosRevealed')).toBe(1)
	})

	it('overwrites lastPosRevealed if there already is one', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		wrapper.setState({ lastPosRevealed: 3 })
		instance.flipCard(1, 2)
		jestExpect(wrapper.state('lastPosRevealed')).toBe(3)
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
		jestExpect(instance.recordMatch).toHaveBeenCalledWith([2, 3])
		// calls updateMoves()
		wrapper.setState({ lastImgRevealed: 1 })
		jest.spyOn(instance, 'updateMoves')
		instance.checkForMatch(1)
		jestExpect(instance.updateMoves).toHaveBeenCalled()
	})

	it('calls "flipBack" and "updateMoves" if this is the second card but it does not match the first', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		// calls flipBack()
		wrapper.setState({ lastImgRevealed: 1 })
		jest.useFakeTimers()
		jest.spyOn(instance, 'flipBack')
		instance.checkForMatch(2)
		jestExpect(setTimeout).toHaveBeenCalledTimes(1)
		jest.runOnlyPendingTimers()
		jestExpect(instance.flipBack).toHaveBeenCalled()
		// calls updateMoves()
		wrapper.setState({ lastImgRevealed: 1 })
		jest.spyOn(instance, 'updateMoves')
		instance.checkForMatch(2)
		jestExpect(instance.updateMoves).toHaveBeenCalled()
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
		jestExpect(wrapper.state('positionsClicked')).toEqual([])
		jestExpect(wrapper.state('posMatches')).toEqual([1, 2, 3, 4])
		jestExpect(wrapper.state('lastImgRevealed')).toBe(null)
		jestExpect(wrapper.state('lastPosRevealed')).toBe(null)
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
		jestExpect(instance.zeroPad).toHaveBeenCalledWith(2)
	})

	it('updates state correctly', () => {
		wrapper.setState({ moves: 1, displayMoves: '01' })
		instance.updateMoves()
		jestExpect(wrapper.state('moves')).toBe(2)
		jestExpect(wrapper.state('displayMoves')).toBe('02')
	})

	it('calls "updateBestScore" when all matches are found', () => {
		wrapper.setState({ 
			posMatches: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
			moves: 1
			})
		jest.spyOn(instance, 'updateBestScore')
		instance.updateMoves()
		jestExpect(instance.updateBestScore).toHaveBeenCalledWith(2)
	})

})

describe('directly invoking "zeroPad" from component instance', () => {

	it('adds leading zero when needed and returns a string', () => {
		let test
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		test = instance.zeroPad(0)
		expect(test).to.equal('00')
		test = instance.zeroPad(1)
		expect(test).to.equal('01')
		test = instance.zeroPad(10)
		expect(test).to.equal('10')
	})

})

describe('directly invoking "updateBestScore" from component instance', () => {

	it('calls "newRecord" when there is a new best score', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		wrapper.setState({ bestScore: 2 })
		jest.spyOn(instance, 'newRecord')
		instance.updateBestScore(1)
		jestExpect(instance.newRecord).toHaveBeenCalled()
	})

	it('sets state with new best score', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		wrapper.setState({ bestScore: 2 })
		instance.updateBestScore(1)
		jestExpect(wrapper.state('bestScore')).toBe(1)
	})

})

describe('directly invoking "newRecord" from component instance', () => {

	it('sets state newBest to true', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		wrapper.setState({ newBest: false })
		instance.newRecord()
		jestExpect(wrapper.state('newBest')).toBe(true)
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
		jestExpect(wrapper.state('positionsClicked')).toEqual([])
		jestExpect(wrapper.state('lastImgRevealed')).toBe(null)
		jestExpect(wrapper.state('lastPosRevealed')).toBe(null)
	})

})

describe('directly invoking "setRandomInts" from component instance', () => {

	it('calls "createUniqueInt"', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		jest.spyOn(instance, 'createUniqueInt')
		instance.setRandomInts()
		jestExpect(instance.createUniqueInt).toHaveBeenCalled()
	})

	it('calls "randomizeArray"', () => {
		const wrapper = shallow(<App />)
		const instance = wrapper.instance()
		jest.spyOn(instance, 'randomizeArray')
		instance.setRandomInts()
		jestExpect(instance.randomizeArray).toHaveBeenCalled()
	})

	// it('sets randomInts in state', () => {
		
	// })

})
