import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Counter from '../components/Counter'

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
		expect(tree).toMatchSnapshot()
	})

})
