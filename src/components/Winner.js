import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import PropTypes from 'prop-types'

const Banner = styled.div`
	opacity: 0.9;
    background: black;
    height: 290px;
    width: 320px;
    text-align: center;
    color: #fccdd3;
    margin: 14px auto;
    position: absolute;
    border-radius: 4px
`

const BannerTitle = styled.p`
	font-size: 44px;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 63px;
`

const Score = styled.p`
	font-size: 26px;
    margin: 0 auto;
    color: #62bcfa;
`

const BannerSubTitle = styled.p`
	font-size: 30px;
	margin: 0 auto;
`

const Winner = ({
	moves,
	newBest,
	replay
}) =>
	<Banner id="banner">
		<BannerTitle id="banner-title">Winner!!!</BannerTitle>
		<Score id="score">Moves: {moves}</Score>
		{newBest &&
			<BannerSubTitle className="flicker">
				New Record!
			</BannerSubTitle>
		}
		<Button
			win
			onClick={replay}
		>
			Play Again?
		</Button>
	</Banner>

Winner.propTypes = {
	moves: PropTypes.number.isRequired,
	newBest: PropTypes.bool.isRequired,
	replay: PropTypes.func.isRequired
}

export default Winner
