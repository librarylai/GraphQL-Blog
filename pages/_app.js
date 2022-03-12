import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@/apollo/client'
import Navbar from '@/components/navbar/Navbar'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import '@/styles/global.css'
import { store } from '@/store/index'
import { Provider } from 'react-redux'

const AppContainer = styled(Box)`
  margin-top: 16px;
  padding: 16px;
`

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Navbar />
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      </Provider>
    </ApolloProvider>
  )
}
