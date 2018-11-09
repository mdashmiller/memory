import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Counter from '../components/Counter'

Enzyme.configure({ adapter: new Adapter() })

describe('Counter', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Counter />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Counter />
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('renders 1 h4 #label', () => {
		const wrapper = shallow(<Counter />)
		expect(wrapper.find('#label').length).toBe(1)
	})

	it('renders 1 div #counter', () => {
		const wrapper = shallow(<Counter />)
		expect(wrapper.find('#counter').length).toBe(1)
	})

	it('shows the correct number of moves', () => {
		const moves = '00'
		const wrapper = shallow(<Counter moves={moves} />)
		expect(wrapper.find('#counter').props().children).toBe('00')
	})

})
