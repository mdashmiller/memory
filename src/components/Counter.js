import React from 'react'
import styled from 'styled-components'

const CounterLabel = styled.h4`
	color: #bbc4ef;
	margin: 8px 0 0;
`

const StyledCounter = styled.div`
	width: 54px;
    height: 36px;
    margin: 4px auto 0;
    font-size: 32px;
    color: #bbc4ef;
    border: 2px solid #bbc4ef;
    border-radius: 4px;
`

const Counter = ({ moves }) => 
	<div>
		<CounterLabel id="label">MOVES</CounterLabel>
		<StyledCounter id="counter">
			{moves}
		</StyledCounter>
	</div>

export default Counter
