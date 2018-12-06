import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Winner from '../components/Winner'
import Button from '../components/Button'

Enzyme.configure({ adapter: new Adapter() })

const props = {
	moves: 5,
	newBest: true,
	replay: jest.fn()
}

describe('<Winner />', () => {

	let wrapper

	beforeAll(() => {
		wrapper = shallow(<Winner { ...props } />)
	})

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Winner { ...props } />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Winner { ...props } />
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('renders 1 div #banner', () => {
		expect(wrapper.find('#banner').length).toBe(1)
	})

	it('renders 1 p #banner-title', () => {
		expect(wrapper.find('#banner-title').length).toBe(1)
	})

	it('renders 1 p #score', () => {
		expect(wrapper.find('#score').length).toBe(1)
	})

	it('renders 1 <Button /> component', () => {
		expect(wrapper.find(Button).length).toBe(1)
	})

	it('displays moves in #score', () => {
		expect(wrapper.find('#score').props().children[1]).toBe(5)
	})

	it('renders 1 bannerSubTitle when new best score exists', () => {
		expect(wrapper.find('.flicker').length).toBe(1)
	})

	it('handles click events', () => {
		wrapper.find(Button).simulate('click')

		expect(props.replay).toHaveBeenCalled()
	})

})
