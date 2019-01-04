import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ScoreBoard from '../components/ScoreBoard'

Enzyme.configure({ adapter: new Adapter() })

describe('<ScoreBoard />', () => {

	const posMatches = []
	let matches

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<ScoreBoard posMatches={posMatches} />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<ScoreBoard posMatches={posMatches} />
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('renders empty circles at all positions', () => {
		const wrapper = shallow(<ScoreBoard posMatches={posMatches} />)

		expect(wrapper.find('.empty').length).toBe(6)
	})

	it('renders 1 smile with 1 position match', () => {
		matches = [1, 2]
		posMatches.push(...matches)
		const wrapper = shallow(<ScoreBoard posMatches={posMatches} />)

		expect(wrapper.find('.smile').length).toBe(1)
	})

	it('renders 2 smiles with 2 position matches', () => {
		matches = [3, 4]
		posMatches.push(...matches)
		const wrapper = shallow(<ScoreBoard posMatches={posMatches} />)

		expect(wrapper.find('.smile').length).toBe(2)
	})

	it('renders 3 smiles with 3 position matches', () => {
		matches = [5, 6]
		posMatches.push(...matches)
		const wrapper = shallow(<ScoreBoard posMatches={posMatches} />)

		expect(wrapper.find('.smile').length).toBe(3)
	})

	it('renders 4 smiles with 4 position matches', () => {
		matches = [7, 8]
		posMatches.push(...matches)
		const wrapper = shallow(<ScoreBoard posMatches={posMatches} />)

		expect(wrapper.find('.smile').length).toBe(4)
	})

	it('renders 5 smiles with 5 position matches', () => {
		matches = [9, 10]
		posMatches.push(...matches)
		const wrapper = shallow(<ScoreBoard posMatches={posMatches} />)

		expect(wrapper.find('.smile').length).toBe(5)
	})

	it('renders 6 smiles with 6 position matches', () => {
		matches = [11, 12]
		posMatches.push(...matches)
		const wrapper = shallow(<ScoreBoard posMatches={posMatches} />)
		
		expect(wrapper.find('.smile').length).toBe(6)
	})

})
