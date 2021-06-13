import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import '../styles'

function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
