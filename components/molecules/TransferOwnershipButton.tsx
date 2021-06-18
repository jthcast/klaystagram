import { css } from '@emotion/css'
import ui from '../../utils/ui'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import KlaytnContainer from './KlaytnContainer'
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
  function showModalHandling() {
    ui.showModal({
      content: (
        <KlaytnContainer>
          <TransferOwnership
            id={id}
            issueDate={issueDate}
            currentOwner={currentOwner}
          />
        </KlaytnContainer>
      ),
    })
  }

  return (
    <Button
      className={cssExchangeButton}
      title="Transfer Ownership"
      onClick={showModalHandling}
      ghost
    >
      <Icon iconName="exchange" />
    </Button>
  )
}

const cssExchangeButton = css`
  font-size: 1.5rem;
`
