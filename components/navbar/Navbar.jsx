import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import useDispatch from '@/hooks/useDispatch'
import useSelector from '@/hooks/useSelector'

import { connectMetaMask } from '@/store/action/walletAction'

const AppBarStyled = styled(AppBar)`
  padding: 20px 0px;
`
const ContainerStyled = styled(Container)`
  display: flex;
  justify-content: space-between;
`
const ButtonStyled = styled(Button)`
  background-color: #fff;
  transition: 0.3s;
  box-shadow: 2px 2px 5px blue;
  &:hover {
    background-color: lightblue;
    color: #222;
  }
`
function Navbar(props) {
  const dispatch = useDispatch()
  const wallet = useSelector((state) => state.walletReducer)
  function handleConnect() {
    dispatch(connectMetaMask())
  }
  return (
    <AppBarStyled position='static'>
      <ContainerStyled maxWidth='xl'>
        <Typography variant='h6' noWrap component='div' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
          GraphQL-Blog
        </Typography>
        {wallet.walletAccount ? (
          <p>{wallet.walletAccount}</p>
        ) : (
          <ButtonStyled variant='outlined' onClick={handleConnect}>
            Connect MetaMask
          </ButtonStyled>
        )}
      </ContainerStyled>
    </AppBarStyled>
  )
}

Navbar.propTypes = {}

export default Navbar
