import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chai, { expect } from 'chai'

import Counter from '../components/Counter'

Enzyme.configure({ adapter: new Adapter() })

global.jestExpect = global.expect
global.expect = chai.expect

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
		jestExpect(tree).toMatchSnapshot()
	})

	it('renders 1 h4 #label', () => {
		const wrapper = shallow(<Counter />)
		expect(wrapper.find('#label')).to.have.lengthOf(1)
	})

	it('renders 1 div #counter', () => {
		const wrapper = shallow(<Counter />)
		expect(wrapper.find('#counter')).to.have.lengthOf(1)
	})

	it('shows the correct number of moves', () => {
		const moves = '00'
		const wrapper = shallow(<Counter moves={moves} />)
		expect(wrapper.find('#counter').props().children)
			.to.equal('00')
	})

})
