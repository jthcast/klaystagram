import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { transferOwnership } from '../../redux/modules/photos'
import { isValidAddress } from '../../utils/crypto'
import ui from '../../utils/ui'
import Button from '../atoms/Button'
import Input from '../atoms/Input'

interface ITransferOwnership{
  id: string;
  issueDate: string;
  currentOwner: string;
}

export default function TransferOwnership({
  id,
  issueDate,
  currentOwner
}: ITransferOwnership) {
  const dispatch = useDispatch()
  const [to, setTo] = useState(``)
  const [warningMessage, setWarningMessage] = useState(``)

  function inputChangeHandling(event){
    setTo(event.target.value)
  }

  function submitHandling(event){
    event.preventDefault()

    if(!isValidAddress(to)){
      setWarningMessage(`* Invalid wallet address`)
      return
    }
    dispatch(transferOwnership(id, to))
    ui.hideModal()
  }

  return (
    <div>
      <h3>Copyright. {id}</h3>
      <p>Issue Date {issueDate}</p>
      <form onSubmit={submitHandling}>
        <Input 
          // className
          isReadOnly
          label='Current Owner'
          value={currentOwner}
        />
        <Input 
          // className
          isRequire
          label='New Owner'
          onChange={inputChangeHandling}
          placeholder='Transfer Ownership to...'
        />
        <Button
          type='submit'
          title='Transfer Ownership'
        >
          Transfer Ownership
        </Button>
      </form>
      <p>{warningMessage}</p>
    </div>
  )
}
