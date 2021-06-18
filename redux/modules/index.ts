import { combineReducers } from 'redux'
import auth from './auth'
import photos from './photos'
import ui from './ui'
import loading from './loading'
import { persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: `root`,
  storage: storageSession,
  whitelist: [`auth`],
}

const rootReducer = combineReducers({
  auth,
  photos,
  ui,
  loading,
})

export type RootState = ReturnType<typeof rootReducer>

export default persistReducer(persistConfig, rootReducer)
