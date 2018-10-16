import React from 'react'
import styled from 'styled-components'
import emojisArr from '../assets/images-arr'

const EmptyCircle = styled.div`
	width: 22px;
	height: 22px;
	margin: 10px 0 0;
	display: inline-block;
	border: 1px solid #bbc4ef;
	border-radius: 13px;
`

const LilSmile = styled.img`
	opacity: 1;
	width: 24px;
	height: 24px;
	display: inline-block;
	margin: 10px 0 0;
`

const ScoreBoard = ({ posMatches }) =>
	// empty circles fill-in with smiley faces
	// for each match the user makes
	<div style={{ textAlign: 'center' }}>
		{posMatches.length > 1
			? <LilSmile src={emojisArr[7]} alt="smiley face"></LilSmile>
			: <EmptyCircle></EmptyCircle>
		}
		{posMatches.length > 3
			? <LilSmile src={emojisArr[7]} alt="smiley face"></LilSmile>
			: <EmptyCircle></EmptyCircle>
		}
		{posMatches.length > 5
			? <LilSmile src={emojisArr[7]} alt="smiley face"></LilSmile>
			: <EmptyCircle></EmptyCircle>
		}
		{posMatches.length > 7
			? <LilSmile src={emojisArr[7]} alt="smiley face"></LilSmile>
			: <EmptyCircle></EmptyCircle>
		}
		{posMatches.length > 9
			? <LilSmile src={emojisArr[7]} alt="smiley face"></LilSmile>
			: <EmptyCircle></EmptyCircle>
		}
		{posMatches.length > 11
			? <LilSmile src={emojisArr[7]} alt="smiley face"></LilSmile>
			: <EmptyCircle></EmptyCircle>
		}
	</div>

export default ScoreBoard
