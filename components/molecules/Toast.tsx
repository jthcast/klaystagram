import { cx } from '@emotion/css'
import { KLAYTN_SCOPE } from '../../constants/url'
import ui from '../../utils/ui'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import LinkNewTab from '../atoms/LinkNewTab'

interface IToast {
  toast?: {
    status?: string
    message?: string
    link?: string
  }
}

export default function Toast({
  toast
}: IToast) {

  return (
    <div>
      <div>
        {toast?.status}
      </div>
      <p>{toast?.message}</p>
      {toast?.link && (
        <LinkNewTab
          link={`${KLAYTN_SCOPE}tx/${toast.link}`}
          title={toast.link}
        />
      )}
      <Button onClick={ui.hideToast}>
        <Icon iconName='times' />
      </Button>
    </div>
  )
}
