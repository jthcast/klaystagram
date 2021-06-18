import { hideModal, hideToast, showModal, showToast } from '../redux/modules/ui'
import { store } from '../pages/_app'

export const ui = {
  showModal: (content) => store.dispatch(showModal(content)),
  hideModal: () => store.dispatch(hideModal()),
  showToast: (toast) => store.dispatch(showToast(toast)),
  hideToast: () => store.dispatch(hideToast()),
}

export default ui
