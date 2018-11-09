import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Winner from '../components/Winner'
import Button from '../components/Button'

Enzyme.configure({ adapter: new Adapter() })

describe('<Winner />', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Winner />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Winner />
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('renders 1 div #banner', () => {
		const wrapper = shallow(<Winner />)
		expect(wrapper.find('#banner').length).toBe(1)
	})

	it('renders 1 p #banner-title', () => {
		const wrapper = shallow(<Winner />)
		expect(wrapper.find('#banner-title').length).toBe(1)
	})

	it('renders 1 p #score', () => {
		const wrapper = shallow(<Winner />)
		expect(wrapper.find('#score').length).toBe(1)
	})

	it('renders 1 <Button /> component', () => {
		const wrapper = shallow(<Winner />)
		expect(wrapper.find(Button).length).toBe(1)
	})

	it('displays moves in #score', () => {
		const moves = 1
		const wrapper = shallow(<Winner moves={moves} />)
		expect(wrapper.find('#score').props().children[1]).toBe(moves)
	})

	it('renders 1 bannerSubTitle when new best score exists', () => {
		const newBest = 1
		const wrapper = shallow(<Winner newBest={newBest} />)
		expect(wrapper.find('.flicker').length).toBe(1)
	})

	it('handles click events', () => {
		const replay = jest.fn()
		const wrapper = shallow(<Winner replay={replay} />)
		wrapper.find(Button).simulate('click')
		expect(replay).toHaveBeenCalled()
	})

})
