import { useState } from 'react'
import caver from '../../klaytn/caver'
import Input from '../atoms/Input'
import Button from '../atoms/Button'

export default function SignupForm() {
  const [privateKey, setPrivateKey] = useState(``)

  function generatePrivateKey(){
    const { privateKey } = caver.klay.accounts.create()
    setPrivateKey(privateKey)
  }

  return (
    <div>
      <Input 
        // className=''
        label='Private Key'
        placeholder='Generate Private Key to Sign up'
        value={privateKey || ''}
        isReadOnly
      />
      <Button
        // className=''
        title='Generate Private Key'
        onClick={generatePrivateKey}
      >
        Generate Private Key
      </Button>
    </div>
  )
}
