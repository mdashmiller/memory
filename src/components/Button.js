import styled from 'styled-components'

const Button = styled.button`
	height: 40px;
	width: 72px;
	font-family: inherit;
	text-align: center;
	border-radius: 7px;
	display: block;
	border: none;
	font-size: 1.25em;
	background: #bbc4ef;
	color: #6534ff;
	font-weight: 700;
	cursor: pointer;

		&:focus {
			outline: none;
		}
`

export default Button
