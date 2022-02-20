import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles'

const AppBarStyled = styled(AppBar)`
    padding: 20px 0px;
`
function Navbar(props) {
  return (
    <AppBarStyled position='static'>
      <Container maxWidth='xl'>
        <Typography variant='h6' noWrap component='div' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
          GraphQL-Blog
        </Typography>
      </Container>
    </AppBarStyled>
  )
}

Navbar.propTypes = {}

export default Navbar
