import { css } from '@emotion/css'
import ui from '../../utils/ui'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import TransferOwnership from './TransferOwnership'

interface ITransferOwnershipButton {
  currentOwner?: string
  id?: string
  issueDate?: string
}

export default function TransferOwnershipButton({
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
      className={cssExchangeButton}
      title='Transfer Ownership'
      onClick={showModalHandling}
      ghost={true}
    >
      <Icon iconName='exchange' />
    </Button>
  )
}

const cssExchangeButton = css`
  border: 0;
  padding: 0;
  font-size: 1.5rem;
`
