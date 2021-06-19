import { css } from '@emotion/css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { transferOwnership } from '../../redux/modules/photos'
import globalCss from '../../styles/global-css'
import { isValidAddress } from '../../utils/crypto'
import ui from '../../utils/ui'
import Button from '../atoms/Button'
import Input from '../atoms/Input'

interface ITransferOwnership {
  id: string
  issueDate: string
  currentOwner: string
}

export default function TransferOwnership({
  id,
  issueDate,
  currentOwner,
}: ITransferOwnership) {
  const dispatch = useDispatch()
  const [to, setTo] = useState(``)
  const [warningMessage, setWarningMessage] = useState(``)

  function inputChangeHandling(event: React.ChangeEvent<HTMLInputElement>) {
    setTo(event.target.value)
  }

  function submitHandling(event: React.FormEvent) {
    event.preventDefault()

    if (!isValidAddress(to)) {
      setWarningMessage(`* Invalid wallet address`)
      return
    }
    dispatch(transferOwnership(id, to))
    ui.hideModal()
  }

  return (
    <div className={cssContainer}>
      <div className={cssInfoContainer}>
        <h3>Copyright. {id}</h3>
        <p className={cssIssueDate}>Issue Date. {issueDate}</p>
      </div>
      <form className={cssForm} onSubmit={submitHandling}>
        <Input isReadOnly label="Current Owner" value={currentOwner} />
        <Input
          isRequire
          label="New Owner"
          onChange={inputChangeHandling}
          placeholder="Transfer Ownership to..."
        />
        <Button className={cssButton} type="submit" title="Transfer Ownership">
          Transfer Ownership
        </Button>
      </form>
      <p className={cssWarningMessage}>{warningMessage}</p>
    </div>
  )
}

const cssContainer = css`
  width: 100%;

  @media ${globalCss.breakpoint.mobileQuery} {
    min-width: 80vw;
  }
`

const cssInfoContainer = css`
  margin-bottom: 1rem;
`

const cssIssueDate = css`
  font-size: 0.75rem;
`

const cssForm = css`
  width: 100%;
  display: grid;
  gap: 1rem;
`

const cssButton = css`
  font-weight: bold;
  padding: 0.5rem 0;
`

const cssWarningMessage = css`
  font-size: 0.9rem;
  color: ${globalCss.color.danger};
`
