import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SubBanner from '../components/SubBanner'

Enzyme.configure({ adapter: new Adapter() })

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
		expect(tree).toMatchSnapshot()
	})

	it('renders 1 div #sub-banner', () => {
		const wrapper = shallow(<SubBanner />)
		expect(wrapper.find('#sub-banner')).toHaveLength(1)
	})

	it('displays the best score when it exists', () => {
		const wrapper = shallow(<SubBanner bestScore={10} />)
		expect(wrapper.find('#sub-banner').props().children[1]).toBe(10)
	})

	it('displays a ? char when no best score exists', () => {
		const wrapper = shallow(<SubBanner bestScore={null} />)
		expect(wrapper.find('#sub-banner').props().children[1]).toBe('?')
	})

})
