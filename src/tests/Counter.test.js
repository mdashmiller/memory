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

	const moves = '00'

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Counter>{moves}</Counter>, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Counter>{moves}</Counter>
		)
		let tree = component.toJSON()
		jestExpect(tree).toMatchSnapshot()
	})

	it('renders 1 h4#label', () => {
		const wrapper = shallow(<Counter />)
		expect(wrapper.find('#label')).to.have.lengthOf(1)
	})

	it('renders 1 div#counter', () => {
		const wrapper = shallow(<Counter />)
		expect(wrapper.find('#counter')).to.have.lengthOf(1)
	})

})
