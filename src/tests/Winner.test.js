import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chai, { expect } from 'chai'

import Winner from '../components/Winner'
import Button from '../components/Button'

Enzyme.configure({ adapter: new Adapter() })

global.jestExpect = global.expect
global.expect = chai.expect

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
		jestExpect(tree).toMatchSnapshot()
	})

	it('renders 1 div#banner', () => {
		const wrapper = shallow(<Winner />)
		expect(wrapper.find('#banner')).to.have.lengthOf(1)
	})

	it('renders 1 p#banner-title', () => {
		const wrapper = shallow(<Winner />)
		expect(wrapper.find('#banner-title')).to.have.lengthOf(1)
	})

	it('renders 1 p#score', () => {
		const wrapper = shallow(<Winner />)
		expect(wrapper.find('#score')).to.have.lengthOf(1)
	})

	it('renders 1 <Button /> component', () => {
		const wrapper = shallow(<Winner />)
		expect(wrapper.find(Button)).to.have.lengthOf(1)
	})

	//it('displays moves in p#score', () => {})

	it('renders 1 bannerSubTitle when new best score exists', () => {
		const newBest = 1
		const wrapper = shallow(<Winner newBest={newBest} />)
		expect(wrapper.find('.flicker')).to.have.lengthOf(1)
	})

})
