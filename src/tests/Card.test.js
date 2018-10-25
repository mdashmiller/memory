import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Card from '../components/Card'

describe('Card', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Card>Test</Card>, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Card>Test</Card>
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})

})
