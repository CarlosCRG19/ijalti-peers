import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'

const Navbar = () => {
	return (
		<nav className='navbar'>
			<div className='navbar-logo'>
				<div className='navbar-icon'></div>
				<h1>IJALTI PEERS</h1>
			</div>
		</nav>
	)
}

export default Navbar
