import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@mui/material/Typography'
import { connectMetaMask } from '@/store/action/walletAction'
import { styled } from '@mui/material/styles'
import useDispatch from '@/hooks/useDispatch'
import useSelector from '@/hooks/useSelector'

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
        <div>
          <Typography variant='h6' noWrap component='span' sx={{ mr: 2, display: { md: 'inline-flex' } }}>
            <Link href='/'>GraphQL-Blog</Link>
          </Typography>
          <Typography variant='subtitle1' noWrap component='span' sx={{ mr: 2, display: { md: 'inline-flex' } }}>
            <Link href='/nftShop'>NFT Shop</Link>
          </Typography>
		  <Typography variant='subtitle1' noWrap component='span' sx={{ mr: 2, display: { md: 'inline-flex' } }}>
            <Link href='/notifications'>通知</Link>
          </Typography>
        </div>

        {wallet.walletAccount ? (
          <div>
            <p>{wallet.walletAccount}</p>
          </div>
        ) : (
          <div>
			
            <ButtonStyled variant='outlined' onClick={handleConnect}>
              Connect MetaMask
            </ButtonStyled>
          </div>
        )}
      </ContainerStyled>
    </AppBarStyled>
  )
}

Navbar.propTypes = {}

export default Navbar
