const START_LOADING = `loading/START_LOADING`
const END_LOADING = `loading/END_LOADING`

export const startLoading = () => (dispatch) => {
  dispatch({
    type: START_LOADING,
  })
}

export const endLoading = () => (dispatch) => {
  dispatch({
    type: END_LOADING,
  })
}

const initialState = {
  isLoading: false,
}

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
