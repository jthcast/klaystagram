import { cx } from '@emotion/css'
import ui from '../../utils/ui'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import TransferOwnership from './TransferOwnership'

interface ITransferOwnershipButton {
  className?: string
  currentOwner?: string
  id?: string
  issueDate?: string
}

export default function TransferOwnershipButton({
  className,
  currentOwner,
  id,
  issueDate,
}: ITransferOwnershipButton) {
  function showModalHandling(){
    ui.showModal({
      content: (
        <TransferOwnership
          id={id}
          issueDate={issueDate}
          currentOwner={currentOwner}
        />
      )
    })
  }

  return (
    <Button
      className={cx(
        // { [cssButton]: true },
        { [className]: className ? true : false }
      )}
      onClick={showModalHandling}
    >
      <Icon iconName='play' />
    </Button>
  )
}
