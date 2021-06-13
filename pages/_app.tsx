import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import '../styles'

export let store

function App({ Component, pageProps }: AppProps) {
  store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
