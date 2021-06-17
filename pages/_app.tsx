import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import '../styles'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

export let store

function App({ Component, pageProps }: AppProps) {
  store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default App
