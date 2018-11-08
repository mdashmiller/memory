import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chai, { expect } from 'chai'
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

describe('App', () => {

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

	// it('renders the <Winner /> component when all the matches are found', () => {
	// 	const posMatches = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	// 	const wrapper = shallow(<App posMatches={posMatches} />)
	// 	expect(wrapper.find('Winner')).to.have.lengthOf(1)
	// })

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

})
