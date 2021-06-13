import caver from '../../klaytn/caver'

const INTEGRATE_WALLET = `auth/INTEGRATE_WALLET`
const REMOVE_WALLET = `auth/REMOVE_WALLET`
const LOGIN = `auth/LOGIN`
const LOGOUT = `auth/LOGOUT`

export const integrateWallet = (privateKey: string) => (dispatch) => {
  const walletInstance = caver.klay.accounts.privateKeyToAccount(privateKey)

  caver.klay.accounts.wallet.add(walletInstance)
  sessionStorage.setItem(`walletInstance`, JSON.stringify(walletInstance))

  return dispatch({
    type: INTEGRATE_WALLET,
    payload: {
      privateKey,
      address: walletInstance.address
    }
  })
}

export const removeWallet = () => (dispatch) => {
  caver.klay.accounts.wallet.clear()
  sessionStorage.removeItem(`walletInstance`)

  return dispatch({
    type: REMOVE_WALLET
  })
}

export const login = (privateKey: string) => (dispatch) => {
  dispatch(integrateWallet(privateKey))
  dispatch({
    type: LOGIN,
    privateKey
  })
}

export const logout = () => (dispatch) => {
  dispatch(removeWallet())
  dispatch({
    type: LOGOUT
  })
}

const isLoggedIn = () => {
  const isClient = typeof window !== 'undefined'
  if(isClient){
    return !!sessionStorage.getItem(`walletInstance`)
  }
  return null
}

const initialState = {
  isLoggedIn: isLoggedIn(), 
  privateKey: null,
  address: null
}

export default function authReducer(state = initialState, action){
  switch (action.type) {
    case INTEGRATE_WALLET:
      return {
        ...state,
        privateKey: action.payload.privateKey,
        address: action.payload.address
      }
    case REMOVE_WALLET:
      return {
        ...state,
        privateKey: null,
        address: null
      }
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false
      }
    default:
      return state
  }
}