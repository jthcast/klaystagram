export const SHOW_MODAL = `ui/SHOW_MODAL`
export const HIDE_MODAL = `ui/HIDE_MODAL`
export const SHOW_TOAST = `ui/SHOW_TOAST`
export const HIDE_TOAST = `ui/HIDE_TOAST`

export const showModal = (content) => {
  content.isOpen = true
  return {
    type: SHOW_MODAL,
    payload: {
      content,
    },
  }
}

export const hideModal = () => ({
  type: HIDE_MODAL,
})

export const showToast = (toast) => ({
  type: SHOW_TOAST,
  payload: {
    toast,
  },
})

export const hideToast = () => ({
  type: HIDE_TOAST,
})

const initialState = {
  modal: null,
  toast: null,
}

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modal: action.payload.content,
      }
    case HIDE_MODAL:
      return {
        ...state,
        modal: null,
      }
    case SHOW_TOAST:
      return {
        ...state,
        toast: action.payload.toast,
      }
    case HIDE_TOAST:
      return {
        ...state,
        toast: null,
      }
    default:
      return state
  }
}
