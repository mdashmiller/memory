import React from 'react'
import styled from 'styled-components'

const CounterLabel = styled.h4`
	margin: 4px 0 0;
`

const StyledCounter = styled.div`
	width: 40px;
	height: 36px;
	margin: 4px auto 0;
	font-size: 32px;
	border: 1px solid black;
	border-radius: 4px;
`

const Counter = ({ moves }) =>
	<div>
		<CounterLabel>MOVES</CounterLabel>
		<StyledCounter>
			{moves}
		</StyledCounter>
	</div>

export default Counter
