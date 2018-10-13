import React from 'react'
import styled from 'styled-components'
import emojisArr from '../assets/images-arr'

const LilSmile = styled.img`
	opacity: 1;
	width: 24px;
	height: 24px;
	display: inline-block;
	margin: 10px 0 0;
`

const ScoreBoard = () =>
	<div>
		<LilSmile src={emojisArr[7]} alt="smiley face"></LilSmile>
		<LilSmile src={emojisArr[7]} alt="smiley face"></LilSmile>
		<LilSmile src={emojisArr[7]} alt="smiley face"></LilSmile>
		<LilSmile src={emojisArr[7]} alt="smiley face"></LilSmile>
		<LilSmile src={emojisArr[7]} alt="smiley face"></LilSmile>
		<LilSmile src={emojisArr[7]} alt="smiley face"></LilSmile>
	</div>

export default ScoreBoard
