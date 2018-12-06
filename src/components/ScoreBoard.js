import React from 'react'
import styled from 'styled-components'
import emojisArr from '../assets/images-arr'
import PropTypes from 'prop-types'

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
			? <LilSmile src={emojisArr[39]} alt="smiley face" className="smile"></LilSmile>
			: <EmptyCircle className="empty"></EmptyCircle>
		}
		{posMatches.length > 3
			? <LilSmile src={emojisArr[39]} alt="smiley face" className="smile"></LilSmile>
			: <EmptyCircle className="empty"></EmptyCircle>
		}
		{posMatches.length > 5
			? <LilSmile src={emojisArr[39]} alt="smiley face" className="smile"></LilSmile>
			: <EmptyCircle className="empty"></EmptyCircle>
		}
		{posMatches.length > 7
			? <LilSmile src={emojisArr[39]} alt="smiley face" className="smile"></LilSmile>
			: <EmptyCircle className="empty"></EmptyCircle>
		}
		{posMatches.length > 9
			? <LilSmile src={emojisArr[39]} alt="smiley face" className="smile"></LilSmile>
			: <EmptyCircle className="empty"></EmptyCircle>
		}
		{posMatches.length > 11
			? <LilSmile src={emojisArr[39]} alt="smiley face" className="smile"></LilSmile>
			: <EmptyCircle className="empty"></EmptyCircle>
		}
	</div>

ScoreBoard.propTypes = {
	posMatches: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default ScoreBoard
