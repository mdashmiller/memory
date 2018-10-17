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

//const cachedScore = localStorage.getItem('best score')
//const bestScore = (cachedScore) ? cachedScore : '?'

const SubBanner = () =>
	<StyledSubBanner>
		Best Score: {/*{bestScore}*/}
	</StyledSubBanner>

export default SubBanner
