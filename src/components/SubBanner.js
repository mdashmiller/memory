import React from 'react'
import styled from 'styled-components'

const StyledSubBanner = styled.div`
	grid-column: 2 / span 2;
	/* border: 1px solid black; */
	height: 24px;
	text-align: center;
	font-size: 19px;
	font-weight: 700;
	color: #fccdd3;
`

const displayScore = score =>
	score ? score : '?'

const SubBanner = ({ bestScore }) =>
	<StyledSubBanner id="sub-banner">
		Best Score: {displayScore(bestScore)}
	</StyledSubBanner>

export default SubBanner
