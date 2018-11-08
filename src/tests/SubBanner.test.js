import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chai, { expect } from 'chai'

import SubBanner from '../components/SubBanner'

Enzyme.configure({ adapter: new Adapter() })

global.jestExpect = global.expect
global.expect = chai.expect

describe('<SubBanner />', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<SubBanner />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<SubBanner />
		)
		let tree = component.toJSON()
		jestExpect(tree).toMatchSnapshot()
	})

	it('renders 1 div #sub-banner', () => {
		const wrapper = shallow(<SubBanner />)
		expect(wrapper.find('#sub-banner')).to.have.lengthOf(1)
	})

	it('displays the best score when it exists', () => {
		const bestScore = 1
		const wrapper = shallow(<SubBanner bestScore={bestScore} />)
		expect(wrapper.find('#sub-banner').props().children[1])
			.to.equal(1)
	})

	it('displays a ? char when no best score exists', () => {
		const bestScore = null
		const wrapper = shallow(<SubBanner bestScore={bestScore} />)
		expect(wrapper.find('#sub-banner').props().children[1])
			.to.equal('?')
	})

})
