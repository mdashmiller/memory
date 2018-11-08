import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Grid from '../components/Grid'

describe('<Grid />', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Grid />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Grid />
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

})
