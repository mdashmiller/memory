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

	const bestScore = 1

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<SubBanner bestScore={bestScore} />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<SubBanner bestScore={bestScore} />
		)
		let tree = component.toJSON()
		jestExpect(tree).toMatchSnapshot()
	})

	it('renders 1 div#banner', () => {
		const wrapper = shallow(<SubBanner bestScore={bestScore} />)
		expect(wrapper.find('#sub-banner')).to.have.lengthOf(1)
	})

	//it('displays the correct item for score' () => {})

})
